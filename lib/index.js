/* --------------------
 * @overlook/plugin-load module
 * Entry point
 * ------------------*/

'use strict';

// Modules
const {join: pathJoin, sep: pathSep} = require('path'),
	invariant = require('simple-invariant'),
	{readdir, stat} = require('fs-extra'),
	Plugin = require('@overlook/plugin'),
	{isRoute, isRouteClass, INIT_PROPS, DEBUG_ERROR} = require('@overlook/route'),
	{isString} = require('is-it-type');

// Imports
const loadFile = require('./loadFile.js'),
	pkg = require('../package.json');

// Constants
const DEFAULT_DIR_INDEX = 'index',
	DEFAULT_ROUTE_EXTS = ['route.js', 'route.mjs', 'route.cjs', 'js', 'mjs', 'cjs'];

// Exports

module.exports = new Plugin(
	pkg,
	{
		symbols: [
			// Public methods
			'LOAD',
			// Props to be set by user
			'DIR_INDEX', 'ROUTE_EXTS', 'PARENT_PATH',
			// Props for other plugins to read
			'FILES', // TODO Move this into Route class?
			// Methods for user/other plugins to override
			'GET_DIR_INDEX', 'GET_ROUTE_EXTS', 'GET_PARENT_PATH', 'IDENTIFY_ROUTE_FILE',
			// Internal methods
			'LOAD_DIR', 'LOAD_FILE', 'ATTACH_FILE', 'LOAD_FILES', 'LOAD_DIRS',
			// Internal props
			'SRC_PATH', 'SRC_DIR_PATH', 'SRC_FILENAME'
		]
	},
	(Route, {
		LOAD,
		DIR_INDEX, ROUTE_EXTS, PARENT_PATH,
		FILES,
		GET_DIR_INDEX, GET_ROUTE_EXTS, GET_PARENT_PATH, IDENTIFY_ROUTE_FILE,
		LOAD_DIR, LOAD_FILE, ATTACH_FILE, LOAD_FILES, LOAD_DIRS,
		SRC_PATH, SRC_DIR_PATH, SRC_FILENAME
	}) => class LoadRoute extends Route {
		/**
		 * Init props used by plugin.
		 * @param {Object} props - Props
		 */
		[INIT_PROPS](props) {
			super[INIT_PROPS](props);
			this[DIR_INDEX] = undefined;
			this[ROUTE_EXTS] = undefined;
			this[PARENT_PATH] = undefined;
			this[FILES] = undefined;
			this[SRC_PATH] = undefined;
			this[SRC_DIR_PATH] = undefined;
			this[SRC_FILENAME] = undefined;
		}

		/**
		 * Load directory.
		 * Called on index route of directory *above* the directory being loaded.
		 * @param {string} path - Path to dir to load
		 * @param {string} [name] - Name for root route (default 'root')
		 * @returns {Route} - Root route
		 */
		[LOAD](path, name) {
			return this[LOAD_DIR](path, name || 'root', {});
		}

		/**
		 * Load directory.
		 * Called on index route of directory *above* the directory being loaded.
		 * @param {string} dirPath - Path of dir to load
		 * @param {string} dirName - Name for route
		 * @param {Object} routes - Map of routes, keyed by path
		 * @returns {Route} - Index route for dir
		 */
		async [LOAD_DIR](dirPath, dirName, routes) {
			// Get files in dir
			const filenames = await readdir(dirPath);
			filenames.sort();

			// Split into files and dirs and group together files by name
			// i.e. `foo.js`, `foo.jsx`, `foo.test.js` together under 'foo'
			const filesMap = Object.create(null),
				subDirs = [];
			for (const filename of filenames) {
				const filePath = pathJoin(dirPath, filename);
				const statObj = await stat(filePath);
				if (statObj.isDirectory()) {
					// Directory
					subDirs.push({name: filename, path: filePath});
					continue;
				}

				// File - split name + ext
				const match = filename.match(/^([^.]*)(?:\.(.*))?$/),
					name = match[1],
					ext = match[2] || '';

				// Add to files
				let file = filesMap[name];
				if (!file) {
					file = {name, routeName: name, exts: Object.create(null)};
					filesMap[name] = file;
				}
				file.exts[ext] = filePath;
			}

			// Identify index for this dir
			let indexName = this[DIR_INDEX];
			if (!indexName) {
				indexName = this[GET_DIR_INDEX]();
				if (!indexName) indexName = DEFAULT_DIR_INDEX;
			}

			// Identify index route file.
			// If no file, create dummy one with no exts.
			let file = filesMap[indexName];
			if (!file) {
				file = {name: indexName, routeName: dirName, exts: Object.create(null)};
			} else {
				file.routeName = dirName;
			}

			// Load file
			const route = await this[LOAD_FILE](file, dirPath, true, routes);
			if (!route) return null;
			this[ATTACH_FILE](route, dirPath, true, routes);

			// Load the dir via index route (exclude index file from list of files passed to [LOAD_FILES])
			if (route[LOAD_FILES]) {
				const files = [];
				for (const name in filesMap) {
					if (name !== indexName) files.push(filesMap[name]);
				}

				await route[LOAD_FILES](files, routes);
			}

			if (route[LOAD_DIRS]) await route[LOAD_DIRS](subDirs, routes);

			return route;
		}

		/**
		 * Load group of files as a route.
		 * Called on index route of directory *containing* the files being loaded.
		 * @param {Object} file - File object of form `{name, routeName, exts: {}}`
		 * @param {string} dirPath - Path of directory file is in
		 * @param {boolean} isIndex - `true` if is directory index
		 * @param {Object} routes - Map of routes, keyed by path
		 * @returns {Route|null} - Route, or `null` if cannot be loaded
		 */
		async [LOAD_FILE](file, dirPath, isIndex, routes) {
			const {name, exts} = file;
			const identified = this[IDENTIFY_ROUTE_FILE](exts, isIndex, name);
			if (identified == null) return null;

			let route, path;
			if (isString(identified)) {
				// Load route file
				path = exts[identified];
				invariant(path, `ext returned from [IDENTIFY_ROUTE_FILE] '${identified}' is not present`);
				route = await loadFile(path);
				invariant(isRoute(route), `file at '${path}' located via [IDENTIFY_ROUTE_FILE] is not a Route`);
			} else if (isRouteClass(identified)) {
				route = new identified(); // eslint-disable-line new-cap
			} else {
				invariant(
					isRoute(identified),
					'return value from [IDENTIFY_ROUTE_FILE] must be a Route, a Route class or a string'
				);
				route = identified;
			}

			// Add props to route
			if (!route.name) route.name = file.routeName;
			route[FILES] = exts;
			if (path) route[SRC_PATH] = path;
			route[SRC_DIR_PATH] = dirPath;
			route[SRC_FILENAME] = name;

			// Add to routes map
			routes[pathJoin(dirPath, name)] = route;
			if (isIndex) routes[`${dirPath}${pathSep}`] = route;

			return route;
		}

		/**
		 * Attach route to its parent route.
		 * Called on index route of directory *containing* the files being loaded.
		 * @param {Route} route - Route
		 * @param {string} dirPath - Path of dir this route loaded from
		 * @param {boolean} isIndex - `true` if is directory index
		 * @param {Object} routes - Map of routes, keyed by path
		 * @returns {undefined}
		 */
		[ATTACH_FILE](route, dirPath, isIndex, routes) {
			// Find parent
			let parentPath = route[PARENT_PATH];
			let parent;
			if (parentPath == null && route[GET_PARENT_PATH]) parentPath = route[GET_PARENT_PATH](isIndex);
			if (parentPath != null) {
				// Conform parent path (remove trailing slashes)
				const match = parentPath.match(/^((?:\.?\.\/)*)(.*?)(\/?)$/);
				invariant(match, `Invalid parent path '${parentPath}' for '${route[SRC_PATH]}'`);

				const [, prefixDots, body, endSlash] = match;
				if (endSlash && body) parentPath = parentPath.slice(0, -1);
				if (!prefixDots) {
					parentPath = ['.', '..'].includes(body) ? `${parentPath}/` : `./${parentPath}`;
				}

				// Find parent
				if (pathSep === '\\') parentPath = parentPath.replace(/\//g, '\\');
				parent = routes[pathJoin(dirPath, parentPath)];
				invariant(parent, `Cannot locate parent path '${parentPath}' for '${route[SRC_PATH]}'`);
			} else {
				// Default parent is the route loading it
				parentPath = isIndex ? '../' : './';
				parent = this;
			}

			route[PARENT_PATH] = parentPath;

			// Attach route to parent
			parent.attachChild(route);
		}

		/**
		 * Load files in directory.
		 * Called on index route of directory *containing* the files.
		 * @param {Array<Object>} files - File objects of form `{name, routeName, exts: {}}`
		 * @param {Object} routes - Map of routes, keyed by path
		 * @returns {undefined}
		 */
		async [LOAD_FILES](files, routes) {
			// Load all files
			const dirPath = this[SRC_DIR_PATH];
			const newRoutes = [];
			for (const file of files) {
				const route = await this[LOAD_FILE](file, dirPath, false, routes);
				if (route) newRoutes.push(route);
			}

			// Attach routes to parents.
			// This is done in a 2nd iteration in case routes loaded earlier have a later route as parent.
			for (const route of newRoutes) {
				this[ATTACH_FILE](route, dirPath, false, routes);
			}
		}

		/**
		 * Load set of sub-directories.
		 * Called on index route of directory *containing* these sub-directories.
		 * @param {Array<Object>} dirs - Dir objects of form `{name, path}`
		 * @param {Object} routes - Map of routes, keyed by path
		 * @returns {undefined}
		 */
		async [LOAD_DIRS](dirs, routes) {
			for (const {path, name} of dirs) {
				await this[LOAD_DIR](path, name, routes);
			}
		}

		/**
		 * Identify which of files is the route file
		 * or specify Route class to use to create route from.
		 * Can be overridden by subclasses.
		 * @param {Object} exts - Object keyed by file extension
		 * @param {boolean} isIndex - `true` if is directory index
		 * @param {string} name - Route name
		 * @returns {string|Object|null|undefined} - If file identified,
		 *   return ext as string, Route or Route class
		 */
		[IDENTIFY_ROUTE_FILE](exts, isIndex, name) { // eslint-disable-line no-unused-vars
			// Get valid file extensions for route files
			let routeExts = this[ROUTE_EXTS];
			if (!routeExts) {
				routeExts = this[GET_ROUTE_EXTS]();
				if (!routeExts) routeExts = DEFAULT_ROUTE_EXTS;
			}

			// Identify if one of files has this extension
			for (const ext of routeExts) {
				if (exts[ext]) return ext;
			}
			return undefined;
		}

		/**
		 * Add load path to error messages.
		 * @param {Error} err - Error
		 * @returns {Error} - Error with extra props
		 */
		[DEBUG_ERROR](err) {
			err = super[DEBUG_ERROR](err);
			const srcPath = this[SRC_PATH];
			if (srcPath) {
				err[SRC_PATH] = srcPath;
				err.message += ` (source path ${srcPath})`;
			}
			return err;
		}

		/**
		 * Identify which of files in a dir is the index file for that dir.
		 * Intended to be overridden by subclasses.
		 * @returns {string|null|undefined} - name
		 */
		[GET_DIR_INDEX]() { // eslint-disable-line class-methods-use-this
			return undefined;
		}

		/**
		 * Identify which file extensions are used for route files.
		 * Intended to be overridden by subclasses.
		 * @returns {Array<string>|null|undefined} - Array of extensions
		 */
		[GET_ROUTE_EXTS]() { // eslint-disable-line class-methods-use-this
			return undefined;
		}

		/**
		 * Get parent path for this route.
		 * Intended to be overridden by subclasses.
		 * @param {boolean} isIndex - `true` if file is directory index
		 * @returns {string|null|undefined} - Parent path (e.g. './')
		 */
		[GET_PARENT_PATH](isIndex) { // eslint-disable-line class-methods-use-this, no-unused-vars
			return undefined;
		}
	}
);
