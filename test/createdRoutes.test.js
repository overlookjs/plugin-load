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
let Route, LOAD_PATH, LOAD_DIR_PATH, PARENT_PATH, FILES;
beforeEach(() => {
	({Route} = modules);
	({LOAD_PATH, LOAD_DIR_PATH, PARENT_PATH, FILES} = modules.loadPlugin);
});

describe('extra files create routes', () => {
	let fixturePath, root, getChild;
	beforeEach(async () => {
		fixturePath = getFixturePath('created routes');
		root = await loadFixture(fixturePath);
		getChild = createGetChild(root);
	});

	describe('root', () => {
		it('is a Route', () => {
			expect(root).toBeInstanceOf(Route);
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

	describe('peer', () => {
		let route;
		beforeEach(() => { route = getChild('view'); });

		it('is a Route', () => {
			expect(route).toBeInstanceOf(Route);
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
			expect(route.children).toBeArrayOfSize(1);
		});

		it('has [LOAD_PATH] set to file path with class name', () => {
			expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, '<ReactRoute>'));
		});

		it('has [LOAD_DIR_PATH] set to dir path', () => {
			expect(route[LOAD_DIR_PATH]).toBe(fixturePath);
		});

		it('file with another ext', () => {
			expect(route[FILES].jsx).toBe(pathJoin(fixturePath, 'view.jsx'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['jsx']);
		});
	});

	describe('peer with [GET_PARENT_PATH] defined in loader class', () => {
		let route;
		beforeEach(() => { route = getChild('view', 'edit'); });

		it('is a Route', () => {
			expect(route).toBeInstanceOf(Route);
		});

		it('has name according to file name', () => {
			expect(route.name).toBe('edit');
		});

		it('has parent as parent', () => {
			expect(route.parent).toBe(getChild('view'));
		});

		it('has [PARENT_PATH] as defined', () => {
			expect(route[PARENT_PATH]).toBe('./view');
		});

		it('has empty children array', () => {
			expect(route.children).toBeArrayOfSize(0);
		});

		it('has [LOAD_PATH] set to file path with class name', () => {
			expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, '<ReactEditRoute>'));
		});

		it('has [LOAD_DIR_PATH] set to dir path', () => {
			expect(route[LOAD_DIR_PATH]).toBe(fixturePath);
		});

		it('file with another ext', () => {
			expect(route[FILES].jsx).toBe(pathJoin(fixturePath, 'edit.jsx'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['jsx']);
		});
	});

	describe('subdirectory', () => {
		let route;
		beforeEach(() => { route = getChild('sub'); });

		it('is a Route', () => {
			expect(route).toBeInstanceOf(Route);
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

		it('has [LOAD_PATH] set to file path with class name', () => {
			expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, 'sub', '<ReactLoadRoute>'));
		});

		it('has [LOAD_DIR_PATH] set to dir path', () => {
			expect(route[LOAD_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
		});

		it('file with another ext', () => {
			expect(route[FILES].jsx).toBe(pathJoin(fixturePath, 'sub', 'index.jsx'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['jsx']);
		});
	});

	describe('subdirectory peer', () => {
		let route;
		beforeEach(() => { route = getChild('sub', 'view'); });

		it('is a Route', () => {
			expect(route).toBeInstanceOf(Route);
		});

		it('has name according to file name', () => {
			expect(route.name).toBe('view');
		});

		it('has parent as parent', () => {
			expect(route.parent).toBe(getChild('sub'));
		});

		it('has [PARENT_PATH] as ./', () => {
			expect(route[PARENT_PATH]).toBe('./');
		});

		it('has children array containing children', () => {
			expect(route.children).toBeArrayOfSize(1);
		});

		it('has [LOAD_PATH] set to file path with class name', () => {
			expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, 'sub', '<ReactRoute>'));
		});

		it('has [LOAD_DIR_PATH] set to dir path', () => {
			expect(route[LOAD_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
		});

		it('file with another ext', () => {
			expect(route[FILES].jsx).toBe(pathJoin(fixturePath, 'sub', 'view.jsx'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['jsx']);
		});
	});

	describe('subdirectory peer with [GET_PARENT_PATH] defined in loader class', () => {
		let route;
		beforeEach(() => { route = getChild('sub', 'view', 'edit'); });

		it('is a Route', () => {
			expect(route).toBeInstanceOf(Route);
		});

		it('has name according to file name', () => {
			expect(route.name).toBe('edit');
		});

		it('has parent as parent', () => {
			expect(route.parent).toBe(getChild('sub', 'view'));
		});

		it('has [PARENT_PATH] as defined', () => {
			expect(route[PARENT_PATH]).toBe('./view');
		});

		it('has empty children array', () => {
			expect(route.children).toBeArrayOfSize(0);
		});

		it('has [LOAD_PATH] set to file path with class name', () => {
			expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, 'sub', '<ReactEditRoute>'));
		});

		it('has [LOAD_DIR_PATH] set to dir path', () => {
			expect(route[LOAD_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
		});

		it('file with another ext', () => {
			expect(route[FILES].jsx).toBe(pathJoin(fixturePath, 'sub', 'edit.jsx'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['jsx']);
		});
	});

	describe('2nd level subdirectory', () => {
		let route;
		beforeEach(() => { route = getChild('sub', 'subSub'); });

		it('is a Route', () => {
			expect(route).toBeInstanceOf(Route);
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

		it('has [LOAD_PATH] set to file path with class name', () => {
			expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, 'sub', 'subSub', '<ReactLoadRoute>'));
		});

		it('has [LOAD_DIR_PATH] set to dir path', () => {
			expect(route[LOAD_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub', 'subSub'));
		});

		it('file with another ext', () => {
			expect(route[FILES].jsx).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'index.jsx'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['jsx']);
		});
	});

	describe('2nd level subdirectory peer', () => {
		let route;
		beforeEach(() => { route = getChild('sub', 'subSub', 'view'); });

		it('is a Route', () => {
			expect(route).toBeInstanceOf(Route);
		});

		it('has name according to file name', () => {
			expect(route.name).toBe('view');
		});

		it('has parent as parent', () => {
			expect(route.parent).toBe(getChild('sub', 'subSub'));
		});

		it('has [PARENT_PATH] as ./', () => {
			expect(route[PARENT_PATH]).toBe('./');
		});

		it('has children array containing children', () => {
			expect(route.children).toBeArrayOfSize(1);
		});

		it('has [LOAD_PATH] set to file path with class name', () => {
			expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, 'sub', 'subSub', '<ReactRoute>'));
		});

		it('has [LOAD_DIR_PATH] set to dir path', () => {
			expect(route[LOAD_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub', 'subSub'));
		});

		it('file with another ext', () => {
			expect(route[FILES].jsx).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'view.jsx'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['jsx']);
		});
	});

	describe('2nd level subdirectory peer with [GET_PARENT_PATH] defined in loader class', () => {
		let route;
		beforeEach(() => { route = getChild('sub', 'subSub', 'view', 'edit'); });

		it('is a Route', () => {
			expect(route).toBeInstanceOf(Route);
		});

		it('has name according to file name', () => {
			expect(route.name).toBe('edit');
		});

		it('has parent as parent', () => {
			expect(route.parent).toBe(getChild('sub', 'subSub', 'view'));
		});

		it('has [PARENT_PATH] as defined', () => {
			expect(route[PARENT_PATH]).toBe('./view');
		});

		it('has empty children array', () => {
			expect(route.children).toBeArrayOfSize(0);
		});

		it('has [LOAD_PATH] set to file path with class name', () => {
			expect(route[LOAD_PATH]).toBe(pathJoin(fixturePath, 'sub', 'subSub', '<ReactEditRoute>'));
		});

		it('has [LOAD_DIR_PATH] set to dir path', () => {
			expect(route[LOAD_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub', 'subSub'));
		});

		it('file with another ext', () => {
			expect(route[FILES].jsx).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'edit.jsx'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['jsx']);
		});
	});
});
