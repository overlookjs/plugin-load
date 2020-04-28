/* --------------------
 * @overlook/plugin-load module
 * Tests for ESM loading
 *
 * This test file is run with Mocha not Jest
 * as Jest cannot deal with dynamic `import()`
 * due to how it processes files with Babel.
 * ------------------*/

/* eslint-disable jest/no-identical-title */

'use strict';

// Modules
const pathJoin = require('path').join,
	parseNodeVersion = require('parse-node-version');

// Alias @overlook/plugin-load
require('module-alias').addAlias('@overlook/plugin-load', pathJoin(__dirname, '../index.js'));

// Imports
const {getFixturePath, loadFixture, createGetChild} = require('./support/utils.js');

// Init
const modules = require('./support/index.js');
global.expect = require('expect');
require('jest-extended');

global.jest = {resetModules() {}};

// Tests

// Refresh Route class and load plugin symbols before each test
let Route, PARENT_PATH, LOAD_PATH, LOAD_DIR_PATH;
beforeEach(() => {
	// Only load once - no way to clear the import cache
	if (Route) return;
	({Route} = modules);
	({PARENT_PATH, LOAD_PATH, LOAD_DIR_PATH} = modules.loadPlugin);
});

// Tests
const nodeVersion = parseNodeVersion(process.version).major;
const describeIfEsmSupported = nodeVersion >= 13 ? describe : describe.skip;

describeIfEsmSupported('loads route files with .mjs extension', () => {
	let fixturePath, root, getChild;
	beforeEach(async () => {
		// Only load once - no way to clear the import cache
		if (root) return;
		fixturePath = getFixturePath('esm', 'mjs');
		root = await loadFixture(fixturePath);
		getChild = createGetChild(root);
	});

	describe('root', () => {
		it('is a Route', () => {
			expect(root).toBeInstanceOf(Route);
		});

		it('is loaded from correct file', () => {
			expect(root.__filename).toBe(pathJoin(fixturePath, 'index.mjs'));
		});

		it('has name "root"', () => {
			expect(root.name).toBe('root');
		});

		it('has children array containing children', () => {
			expect(root.children).toBeArrayOfSize(2);
		});

		it('has [LOAD_PATH] set to file path', () => {
			expect(root[LOAD_PATH]).toBe(pathJoin(fixturePath, 'index.mjs'));
		});

		it('has [LOAD_DIR_PATH] set to dir path', () => {
			expect(root[LOAD_DIR_PATH]).toBe(fixturePath);
		});
	});

	describe('files in same directory', () => {
		let route;
		beforeEach(() => { route = getChild('view'); });

		it('is a Route', () => {
			expect(route).toBeInstanceOf(Route);
		});

		it('is loaded from correct file', () => {
			expect(route.__filename).toBe(pathJoin(fixturePath, 'view.mjs'));
		});

		it('has name according to file name', () => {
			expect(route.name).toBe('view');
		});

		it('has root as parent', () => {
			expect(route.parent).toBe(root);
		});

		it('has [PARENT_PATH] as ./', () => {
			expect(route[PARENT_PATH]).toBe('./');
		});

		it('has empty children array', () => {
			expect(route.children).toBeArrayOfSize(0);
		});

		it('has [LOAD_PATH] set to file path', () => {
			expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, 'view.mjs'));
		});

		it('has [LOAD_DIR_PATH] set to dir path', () => {
			expect(route[LOAD_DIR_PATH]).toBe(fixturePath);
		});
	});

	describe('files in sub directory', () => {
		let route;
		beforeEach(() => { route = getChild('sub'); });

		it('is a Route', () => {
			expect(route).toBeInstanceOf(Route);
		});

		it('is loaded from correct file', () => {
			expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'index.mjs'));
		});

		it('has name according to file name', () => {
			expect(route.name).toBe('sub');
		});

		it('has root as parent', () => {
			expect(route.parent).toBe(root);
		});

		it('has [PARENT_PATH] as ../', () => {
			expect(route[PARENT_PATH]).toBe('../');
		});

		it('has empty children array', () => {
			expect(route.children).toBeArrayOfSize(0);
		});

		it('has [LOAD_PATH] set to file path', () => {
			expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, 'sub', 'index.mjs'));
		});

		it('has [LOAD_DIR_PATH] set to dir path', () => {
			expect(route[LOAD_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
		});
	});
});

describeIfEsmSupported('loads route files with .js extension', () => {
	let fixturePath, root, getChild;
	beforeEach(async () => {
		// Only load once - no way to clear the import cache
		if (root) return;
		fixturePath = getFixturePath('esm', 'js');
		root = await loadFixture(fixturePath);
		getChild = createGetChild(root);
	});

	describe('root', () => {
		it('is a Route', () => {
			expect(root).toBeInstanceOf(Route);
		});

		it('is loaded from correct file', () => {
			expect(root.__filename).toBe(pathJoin(fixturePath, 'index.js'));
		});

		it('has name "root"', () => {
			expect(root.name).toBe('root');
		});

		it('has children array containing children', () => {
			expect(root.children).toBeArrayOfSize(2);
		});

		it('has [LOAD_PATH] set to file path', () => {
			expect(root[LOAD_PATH]).toBe(pathJoin(fixturePath, 'index.js'));
		});

		it('has [LOAD_DIR_PATH] set to dir path', () => {
			expect(root[LOAD_DIR_PATH]).toBe(fixturePath);
		});
	});

	describe('files in same directory', () => {
		let route;
		beforeEach(() => { route = getChild('view'); });

		it('is a Route', () => {
			expect(route).toBeInstanceOf(Route);
		});

		it('is loaded from correct file', () => {
			expect(route.__filename).toBe(pathJoin(fixturePath, 'view.js'));
		});

		it('has name according to file name', () => {
			expect(route.name).toBe('view');
		});

		it('has root as parent', () => {
			expect(route.parent).toBe(root);
		});

		it('has [PARENT_PATH] as ./', () => {
			expect(route[PARENT_PATH]).toBe('./');
		});

		it('has empty children array', () => {
			expect(route.children).toBeArrayOfSize(0);
		});

		it('has [LOAD_PATH] set to file path', () => {
			expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, 'view.js'));
		});

		it('has [LOAD_DIR_PATH] set to dir path', () => {
			expect(route[LOAD_DIR_PATH]).toBe(fixturePath);
		});
	});

	describe('files in sub directory', () => {
		let route;
		beforeEach(() => { route = getChild('sub'); });

		it('is a Route', () => {
			expect(route).toBeInstanceOf(Route);
		});

		it('is loaded from correct file', () => {
			expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'index.js'));
		});

		it('has name according to file name', () => {
			expect(route.name).toBe('sub');
		});

		it('has root as parent', () => {
			expect(route.parent).toBe(root);
		});

		it('has [PARENT_PATH] as ../', () => {
			expect(route[PARENT_PATH]).toBe('../');
		});

		it('has empty children array', () => {
			expect(route.children).toBeArrayOfSize(0);
		});

		it('has [LOAD_PATH] set to file path', () => {
			expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, 'sub', 'index.js'));
		});

		it('has [LOAD_DIR_PATH] set to dir path', () => {
			expect(route[LOAD_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
		});
	});
});
