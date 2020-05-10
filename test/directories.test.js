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
let Route, PARENT_PATH, SRC_PATH, SRC_DIR_PATH;
beforeEach(() => {
	({Route} = modules);
	({PARENT_PATH, SRC_PATH, SRC_DIR_PATH} = modules.loadPlugin);
});

describe('directories', () => {
	let fixturePath, root, getChild;
	beforeEach(async () => {
		fixturePath = getFixturePath('directories');
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
	});

	describe('1 level deep', () => {
		describe('index file', () => {
			let route;
			beforeEach(() => { route = getChild('sub'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'index.js'));
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

			it('has children array containing children', () => {
				expect(route.children).toBeArrayOfSize(2);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub', 'index.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
			});
		});

		describe('peer file', () => {
			let route;
			beforeEach(() => { route = getChild('sub', 'view'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'view.js'));
			});

			it('has name according to file name', () => {
				expect(route.name).toBe('view');
			});

			it('has index as parent', () => {
				expect(route.parent).toBe(getChild('sub'));
			});

			it('has [PARENT_PATH] as ./', () => {
				expect(route[PARENT_PATH]).toBe('./');
			});

			it('has empty children array', () => {
				expect(route.children).toBeArrayOfSize(0);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub', 'view.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
			});
		});
	});

	describe('2 levels deep', () => {
		describe('index file', () => {
			let route;
			beforeEach(() => { route = getChild('sub', 'subSub'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'index.js'));
			});

			it('has name according to directory name', () => {
				expect(route.name).toBe('subSub');
			});

			it('has parent as parent', () => {
				expect(route.parent).toBe(getChild('sub'));
			});

			it('has [PARENT_PATH] as ../', () => {
				expect(route[PARENT_PATH]).toBe('../');
			});

			it('has children array containing children', () => {
				expect(route.children).toBeArrayOfSize(1);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'index.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub', 'subSub'));
			});
		});

		describe('peer file', () => {
			let route;
			beforeEach(() => { route = getChild('sub', 'subSub', 'view'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'view.js'));
			});

			it('has name according to file name', () => {
				expect(route.name).toBe('view');
			});

			it('has index as parent', () => {
				expect(route.parent).toBe(getChild('sub', 'subSub'));
			});

			it('has [PARENT_PATH] as ./', () => {
				expect(route[PARENT_PATH]).toBe('./');
			});

			it('has empty children array', () => {
				expect(route.children).toBeArrayOfSize(0);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'view.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub', 'subSub'));
			});
		});
	});
});
