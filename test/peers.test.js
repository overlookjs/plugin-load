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

describe('loads peer files', () => {
	let fixturePath, root, getChild;
	beforeEach(async () => {
		fixturePath = getFixturePath('peers');
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
			expect(root.children).toBeArrayOfSize(1);
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

	describe('files in same directory', () => {
		describe('without [PARENT_PATH] or [GET_PARENT_PATH]', () => {
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

			it('has children array containing children', () => {
				expect(route.children).toBeArrayOfSize(2);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'view.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(fixturePath);
			});

			it('has [SRC_FILENAME] set to file name', () => {
				expect(route[SRC_FILENAME]).toBe('view');
			});
		});

		describe('with [PARENT_PATH] as peer', () => {
			let route;
			beforeEach(() => { route = getChild('view', 'edit'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'edit.js'));
			});

			it('has name according to file name', () => {
				expect(route.name).toBe('edit');
			});

			it('has parent route as parent', () => {
				expect(route.parent).toBe(getChild('view'));
			});

			it('has [PARENT_PATH] defined', () => {
				expect(route[PARENT_PATH]).toBe('./view');
			});

			it('has empty children array', () => {
				expect(route.children).toBeArrayOfSize(0);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'edit.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(fixturePath);
			});

			it('has [SRC_FILENAME] set to file name', () => {
				expect(route[SRC_FILENAME]).toBe('edit');
			});
		});

		describe('with [GET_PARENT_PATH] which returns peer', () => {
			let route;
			beforeEach(() => { route = getChild('view', 'delete'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'delete.js'));
			});

			it('has name according to file name', () => {
				expect(route.name).toBe('delete');
			});

			it('has parent route as parent', () => {
				expect(route.parent).toBe(getChild('view'));
			});

			it('has [PARENT_PATH] defined', () => {
				expect(route[PARENT_PATH]).toBe('./view');
			});

			it('has empty children array', () => {
				expect(route.children).toBeArrayOfSize(0);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'delete.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(fixturePath);
			});

			it('has [SRC_FILENAME] set to file name', () => {
				expect(route[SRC_FILENAME]).toBe('delete');
			});
		});
	});
});
