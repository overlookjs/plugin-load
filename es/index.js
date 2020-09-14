/* --------------------
 * @overlook/plugin-load module
 * ESM entry point
 * Re-export CJS with named exports
 * ------------------*/

// Exports

import loadPlugin from '../lib/index.js';

export default loadPlugin;
export const {
	LOAD,
	DIR_INDEX,
	ROUTE_EXTS,
	PARENT_PATH,
	FILES,
	GET_DIR_INDEX,
	GET_ROUTE_EXTS,
	GET_PARENT_PATH,
	IDENTIFY_ROUTE_FILE,
	LOAD_DIR,
	LOAD_FILE,
	ATTACH_FILE,
	LOAD_FILES,
	LOAD_DIRS,
	SRC_PATH,
	SRC_DIR_PATH,
	SRC_FILENAME,
	// From @overlook/plugin-fs
	File
} = loadPlugin;
