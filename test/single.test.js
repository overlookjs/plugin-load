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
let Route, SRC_PATH, SRC_DIR_PATH, SRC_FILENAME;
beforeEach(() => {
	({Route} = modules);
	({SRC_PATH, SRC_DIR_PATH, SRC_FILENAME} = modules.loadPlugin);
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

	it('has [SRC_PATH] set to file path', () => {
		expect(root[SRC_PATH]).toBe(pathJoin(fixturePath, 'index.js'));
	});

	it('has [SRC_DIR_PATH] set to dir path', () => {
		expect(root[SRC_DIR_PATH]).toBe(fixturePath);
	});

	it('has [SRC_FILENAME] set to file name', () => {
		expect(root[SRC_FILENAME]).toBe('index');
	});
});
