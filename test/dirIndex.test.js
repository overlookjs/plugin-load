/* --------------------
 * @overlook/plugin-load module
 * Tests
 * ------------------*/

'use strict';

// Modules
const pathJoin = require('path').join;

// Imports
const {getFixturePath, loadFixture, createGetChild} = require('./support/utils.js');

// Init
const modules = require('./support/index.js');

// Tests

// Refresh Route class and load plugin symbols before each test
let Route, PARENT_PATH, LOAD_PATH, LOAD_DIR_PATH;
beforeEach(() => {
	({Route} = modules);
	({PARENT_PATH, LOAD_PATH, LOAD_DIR_PATH} = modules.loadPlugin);
});

describe('customised index file', () => {
	describe('using [DIR_INDEX]', () => {
		let fixturePath, root, getChild;
		beforeEach(async () => {
			fixturePath = getFixturePath('index', 'dirIndex');
			root = await loadFixture(fixturePath);
			getChild = createGetChild(root);
		});

		describe('sub folder', () => {
			let route;
			beforeEach(() => { route = getChild('sub'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', '_index.js'));
			});

			it('has name according to directory name', () => {
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
				expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, 'sub', '_index.js'));
			});

			it('has [LOAD_DIR_PATH] set to dir path', () => {
				expect(route[LOAD_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
			});
		});

		describe('2nd sub folder', () => {
			let route;
			beforeEach(() => { route = getChild('sub2'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub2', '_index.js'));
			});

			it('has name according to directory name', () => {
				expect(route.name).toBe('sub2');
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
				expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, 'sub2', '_index.js'));
			});

			it('has [LOAD_DIR_PATH] set to dir path', () => {
				expect(route[LOAD_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub2'));
			});
		});
	});

	describe('using [GET_DIR_INDEX]', () => {
		let fixturePath, root, getChild;
		beforeEach(async () => {
			fixturePath = getFixturePath('index', 'getDirIndex');
			root = await loadFixture(fixturePath);
			getChild = createGetChild(root);
		});

		describe('sub folder', () => {
			let route;
			beforeEach(() => { route = getChild('sub'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', '_index.js'));
			});

			it('has name according to directory name', () => {
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
				expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, 'sub', '_index.js'));
			});

			it('has [LOAD_DIR_PATH] set to dir path', () => {
				expect(route[LOAD_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
			});
		});

		describe('2nd sub folder', () => {
			let route;
			beforeEach(() => { route = getChild('sub2'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub2', '_index.js'));
			});

			it('has name according to directory name', () => {
				expect(route.name).toBe('sub2');
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
				expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, 'sub2', '_index.js'));
			});

			it('has [LOAD_DIR_PATH] set to dir path', () => {
				expect(route[LOAD_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub2'));
			});
		});
	});
});
