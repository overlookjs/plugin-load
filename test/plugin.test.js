/* --------------------
 * @overlook/plugin-load module
 * Tests
 * ------------------*/

'use strict';

// Modules
const Route = require('@overlook/route'),
	Plugin = require('@overlook/plugin'),
	loadPlugin = require('@overlook/plugin-load');

// Tests

describe('Plugin', () => { // eslint-disable-line jest/lowercase-name
	it('is an instance of Plugin class', () => {
		expect(loadPlugin).toBeInstanceOf(Plugin);
	});

	it('when passed to `Route.extend()`, returns subclass of Route', () => {
		const LoadRoute = Route.extend(loadPlugin);
		expect(LoadRoute).toBeDirectSubclassOf(Route);
	});
});
