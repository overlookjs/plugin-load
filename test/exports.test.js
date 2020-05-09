/* --------------------
 * @overlook/plugin-load module
 * Tests
 * CJS export
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin'),
	loadPlugin = require('@overlook/plugin-load');

// Imports
const itExports = require('./exports.js');

// Tests

describe('CJS export', () => { // eslint-disable-line jest/lowercase-name
	it('is an instance of Plugin class', () => {
		expect(loadPlugin).toBeInstanceOf(Plugin);
	});

	describe('has properties', () => {
		itExports(loadPlugin);
	});
});
