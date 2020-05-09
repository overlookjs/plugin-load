/* --------------------
 * @overlook/plugin-load module
 * Tests
 * ESM export
 * ------------------*/

// Modules
import Plugin from '@overlook/plugin';
import loadPlugin, * as namedExports from '@overlook/plugin-load/es';

// Imports
import itExports from './exports.js';

// Tests

describe('ESM export', () => { // eslint-disable-line jest/lowercase-name
	it('default export is an instance of Plugin class', () => {
		expect(loadPlugin).toBeInstanceOf(Plugin);
	});

	describe('default export has properties', () => {
		itExports(loadPlugin);
	});

	describe('named exports', () => {
		itExports(namedExports);
	});
});
