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
let Route, PARENT_PATH, SRC_PATH, SRC_DIR_PATH, SRC_FILENAME;
beforeEach(() => {
	({Route} = modules);
	({PARENT_PATH, SRC_PATH, SRC_DIR_PATH, SRC_FILENAME} = modules.loadPlugin);
});

describe('customised index file', () => {
	describe('using [DIR_INDEX]', () => {
		let fixturePath, root, getChild;
		beforeEach(async () => {
			fixturePath = getFixturePath('index/dirIndex');
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
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub/_index.js'));
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

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub/_index.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
			});

			it('has [SRC_FILENAME] set to file name', () => {
				expect(route[SRC_FILENAME]).toBe('_index');
			});
		});

		describe('2nd sub folder', () => {
			let route;
			beforeEach(() => { route = getChild('sub2'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub2/_index.js'));
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

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub2/_index.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub2'));
			});

			it('has [SRC_FILENAME] set to file name', () => {
				expect(route[SRC_FILENAME]).toBe('_index');
			});
		});
	});

	describe('using [GET_DIR_INDEX]', () => {
		let fixturePath, root, getChild;
		beforeEach(async () => {
			fixturePath = getFixturePath('index/getDirIndex');
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
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub/_index.js'));
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

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub/_index.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
			});

			it('has [SRC_FILENAME] set to file name', () => {
				expect(route[SRC_FILENAME]).toBe('_index');
			});
		});

		describe('2nd sub folder', () => {
			let route;
			beforeEach(() => { route = getChild('sub2'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub2/_index.js'));
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

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub2/_index.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub2'));
			});

			it('has [SRC_FILENAME] set to file name', () => {
				expect(route[SRC_FILENAME]).toBe('_index');
			});
		});
	});
});
