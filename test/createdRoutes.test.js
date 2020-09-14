/* --------------------
 * @overlook/plugin-load module
 * Tests
 * ------------------*/

'use strict';

// Modules
const pathJoin = require('path').join;

// Imports
const {
	getFixturePath, loadFixture, createGetChild, expectToBeFileWithPath
} = require('./support/utils.js');

// Init
const modules = require('./support/index.js');

// Tests

// Refresh Route class and load plugin symbols before each test
let Route, SRC_PATH, SRC_DIR_PATH, SRC_FILENAME, PARENT_PATH, FILES;
beforeEach(() => {
	({Route} = modules);
	({SRC_PATH, SRC_DIR_PATH, PARENT_PATH, SRC_FILENAME, FILES} = modules.loadPlugin);
});

describe('extra files create routes', () => {
	describe('via returning Route class from [IDENTIFY_ROUTE_FILE]', () => {
		describeTests('via class');
	});

	describe('via returning Route class instance from [IDENTIFY_ROUTE_FILE]', () => {
		describeTests('via route');
	});
});

function describeTests(fixtureName) {
	let fixturePath, root, getChild;
	beforeEach(async () => {
		fixturePath = getFixturePath('created routes', fixtureName);
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

		it('has [SRC_PATH] undefined', () => {
			expect(route[SRC_PATH]).toBeUndefined();
		});

		it('has [SRC_DIR_PATH] set to dir path', () => {
			expect(route[SRC_DIR_PATH]).toBe(fixturePath);
		});

		it('has [SRC_FILENAME] set to file name', () => {
			expect(route[SRC_FILENAME]).toBe('view');
		});

		it('file with another ext', () => {
			expectToBeFileWithPath(route[FILES].jsx, pathJoin(fixturePath, 'view.jsx'));
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

		it('has [SRC_PATH] undefined', () => {
			expect(route[SRC_PATH]).toBeUndefined();
		});

		it('has [SRC_DIR_PATH] set to dir path', () => {
			expect(route[SRC_DIR_PATH]).toBe(fixturePath);
		});

		it('has [SRC_FILENAME] set to file name', () => {
			expect(route[SRC_FILENAME]).toBe('edit');
		});

		it('file with another ext', () => {
			expectToBeFileWithPath(route[FILES].jsx, pathJoin(fixturePath, 'edit.jsx'));
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

		it('has [SRC_PATH] undefined', () => {
			expect(route[SRC_PATH]).toBeUndefined();
		});

		it('has [SRC_DIR_PATH] set to dir path', () => {
			expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
		});

		it('has [SRC_FILENAME] set to file name', () => {
			expect(route[SRC_FILENAME]).toBe('index');
		});

		it('file with another ext', () => {
			expectToBeFileWithPath(route[FILES].jsx, pathJoin(fixturePath, 'sub/index.jsx'));
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

		it('has [SRC_PATH] undefined', () => {
			expect(route[SRC_PATH]).toBeUndefined();
		});

		it('has [SRC_DIR_PATH] set to dir path', () => {
			expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
		});

		it('has [SRC_FILENAME] set to file name', () => {
			expect(route[SRC_FILENAME]).toBe('view');
		});

		it('file with another ext', () => {
			expectToBeFileWithPath(route[FILES].jsx, pathJoin(fixturePath, 'sub/view.jsx'));
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

		it('has [SRC_PATH] undefined', () => {
			expect(route[SRC_PATH]).toBeUndefined();
		});

		it('has [SRC_DIR_PATH] set to dir path', () => {
			expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
		});

		it('has [SRC_FILENAME] set to file name', () => {
			expect(route[SRC_FILENAME]).toBe('edit');
		});

		it('file with another ext', () => {
			expectToBeFileWithPath(route[FILES].jsx, pathJoin(fixturePath, 'sub/edit.jsx'));
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

		it('has [SRC_PATH] undefined', () => {
			expect(route[SRC_PATH]).toBeUndefined();
		});

		it('has [SRC_DIR_PATH] set to dir path', () => {
			expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub/subSub'));
		});

		it('has [SRC_FILENAME] set to file name', () => {
			expect(route[SRC_FILENAME]).toBe('index');
		});

		it('file with another ext', () => {
			expectToBeFileWithPath(route[FILES].jsx, pathJoin(fixturePath, 'sub/subSub/index.jsx'));
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

		it('has [SRC_PATH] undefined', () => {
			expect(route[SRC_PATH]).toBeUndefined();
		});

		it('has [SRC_DIR_PATH] set to dir path', () => {
			expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub/subSub'));
		});

		it('has [SRC_FILENAME] set to file name', () => {
			expect(route[SRC_FILENAME]).toBe('view');
		});

		it('file with another ext', () => {
			expectToBeFileWithPath(route[FILES].jsx, pathJoin(fixturePath, 'sub/subSub/view.jsx'));
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

		it('has [SRC_PATH] undefined', () => {
			expect(route[SRC_PATH]).toBeUndefined();
		});

		it('has [SRC_DIR_PATH] set to dir path', () => {
			expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub/subSub'));
		});

		it('has [SRC_FILENAME] set to file name', () => {
			expect(route[SRC_FILENAME]).toBe('edit');
		});

		it('file with another ext', () => {
			expectToBeFileWithPath(route[FILES].jsx, pathJoin(fixturePath, 'sub/subSub/edit.jsx'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['jsx']);
		});
	});
}
