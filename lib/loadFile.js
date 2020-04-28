/* --------------------
 * @overlook/plugin-load module
 * Load Javascript file
 * ------------------*/

'use strict';

// Modules
const {join: pathJoin, dirname, extname} = require('path'),
	fs = require('fs-extra');

// Exports

/**
 * Load Javascript file.
 * Supports ESM modules in Node 13+.
 * ESM modules with `.js` extension are supported by looking up `type` field in `package.json`.
 * @param {string} path - File path
 * @returns {*} - Loaded file content
 */
module.exports = async function loadFile(path) {
	// Determine if file is ESM or CJS
	let isEsm = isEsmExt(path);
	if (isEsm === null) isEsm = await determineIfEsmFromPackageJson(path);

	// If CJS, require it
	if (!isEsm) return require(path); // eslint-disable-line global-require, import/no-dynamic-require

	// ESM - Import it and return default export
	const mod = await import(path); // eslint-disable-line node/no-unsupported-features/es-syntax
	return mod.default;
};

/**
 * Determine if file is ESM from file extension.
 * .mjs = ESM
 * .cjs = CJS
 * .js = Needs to be determined by reference to package.json
 * Anything else = ditto
 *
 * @param {string} path - File path
 * @returns {boolean|null} - `true` if ESM, `false` if CJS, `null` if undetermined
 */
function isEsmExt(path) {
	const ext = extname(path);
	if (ext === '.mjs') return true;
	if (ext === '.cjs') return false;
	return null;
}

/**
 * Determine if a .js file should be treated as ESM.
 * Follows Node.js's resolution strategy of searching up the file path for a `package.json` file.
 * If `pakage.json`'s `type` field is 'module', the file should be treated as ESM.
 * https://nodejs.org/dist/latest-v12.x/docs/api/esm.html#esm_package_json_type_field
 *
 * @param {string} path - File path
 * @returns {boolean} - `true` if file should be considered ESM
 */
async function determineIfEsmFromPackageJson(path) {
	while (true) { // eslint-disable-line no-constant-condition
		const parentPath = dirname(path);

		// If reached root, no package.json so not ESM
		if (parentPath === path) return false;
		path = parentPath;

		// Try to read package.json
		const pkgPath = pathJoin(path, 'package.json');
		let pkgStr;
		try {
			pkgStr = await fs.readFile(pkgPath, 'utf8');
		} catch (err) {
			if (err.code !== 'ENOENT') throw err;
			// No package.json file in dir - continue
			continue;
		}

		// package.json found - Parse type field
		// Node treats a `package.json` file with no type field or type field containing
		// any value other than 'module' as indicating CJS.
		const {type} = JSON.parse(pkgStr);
		return type === 'module';
	}
}
