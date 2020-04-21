/* --------------------
 * @overlook/plugin-load module
 * Tests
 * ------------------*/

'use strict';

// Modules
const pathJoin = require('path').join;

// Imports
const {getFixturePath, loadFixture} = require('./support/utils.js');

// Init
const modules = require('./support/index.js');

// Tests

// Refresh Route class and load plugin symbols before each test
let Route, LOAD_PATH, LOAD_DIR_PATH;
beforeEach(() => {
	({Route} = modules);
	({LOAD_PATH, LOAD_DIR_PATH} = modules.loadPlugin);
});

describe('loads single route file and it', () => {
	let fixturePath, root;
	beforeEach(async () => {
		fixturePath = getFixturePath('single');
		root = await loadFixture(fixturePath);
	});

	it('is a Route', () => {
		expect(root).toBeInstanceOf(Route);
	});

	it('is loaded from correct file', () => {
		expect(root.__filename).toBe(pathJoin(fixturePath, 'index.js'));
	});

	it('has name "root"', () => {
		expect(root.name).toBe('root');
	});

	it('has empty children array', () => {
		expect(root.children).toBeArrayOfSize(0);
	});

	it('has [LOAD_PATH] set to file path', () => {
		expect(root[LOAD_PATH]).toBe(pathJoin(fixturePath, 'index.js'));
	});

	it('has [LOAD_DIR_PATH] set to dir path', () => {
		expect(root[LOAD_DIR_PATH]).toBe(fixturePath);
	});
});
