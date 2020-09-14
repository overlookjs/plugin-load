/* --------------------
 * @overlook/plugin-load module
 * Tests
 * Test function to ensure all exports present
 * ------------------*/

/* eslint-disable jest/no-export */

'use strict';

// Exports

module.exports = function itExports(loadPlugin) {
	describe('symbols', () => {
		it.each([
			'LOAD',
			'DIR_INDEX', 'ROUTE_EXTS', 'PARENT_PATH',
			'FILES',
			'GET_DIR_INDEX', 'GET_ROUTE_EXTS', 'GET_PARENT_PATH', 'IDENTIFY_ROUTE_FILE',
			'LOAD_DIR', 'LOAD_FILE', 'ATTACH_FILE', 'LOAD_FILES', 'LOAD_DIRS',
			'SRC_PATH', 'SRC_DIR_PATH', 'SRC_FILENAME'
		])('%s', (key) => {
			expect(typeof loadPlugin[key]).toBe('symbol');
		});
	});

	describe('properties', () => {
		it('File', () => { // eslint-disable-line jest/lowercase-name
			expect(loadPlugin.File).toBeFunction();
		});
	});
};
