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

describe('directory traversal', () => {
	describe('1 level deep', () => {
		let fixturePath, root, getChild;
		beforeEach(async () => {
			fixturePath = getFixturePath('directory traversal', '1 level');
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
		});

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

			it('has empty children array', () => {
				expect(route.children).toBeArrayOfSize(0);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub', 'index.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
			});
		});

		describe('peer file with [PARENT_PATH] "../"', () => {
			let route;
			beforeEach(() => { route = getChild('onParent'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'onParent.js'));
			});

			it('has name according to file name', () => {
				expect(route.name).toBe('onParent');
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
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub', 'onParent.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
			});
		});
	});

	describe('2 levels deep', () => {
		let fixturePath, root, getChild;
		beforeEach(async () => {
			fixturePath = getFixturePath('directory traversal', '2 levels');
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
		});

		describe('1st level index file', () => {
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
				expect(route.children).toBeArrayOfSize(1);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub', 'index.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
			});
		});

		describe('2nd level index file', () => {
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

			it('has empty children array', () => {
				expect(route.children).toBeArrayOfSize(0);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'index.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub', 'subSub'));
			});
		});

		describe('2nd level peer file with [PARENT_PATH] "../../"', () => {
			let route;
			beforeEach(() => { route = getChild('onParentParent'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'onParentParent.js'));
			});

			it('has name according to file name', () => {
				expect(route.name).toBe('onParentParent');
			});

			it('has root as parent', () => {
				expect(route.parent).toBe(root);
			});

			it('has [PARENT_PATH] as ../../', () => {
				expect(route[PARENT_PATH]).toBe('../../');
			});

			it('has empty children array', () => {
				expect(route.children).toBeArrayOfSize(0);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'onParentParent.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub', 'subSub'));
			});
		});
	});

	describe('directory index on parent peer', () => {
		let fixturePath, root, getChild;
		beforeEach(async () => {
			fixturePath = getFixturePath('directory traversal', 'on peer');
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

		describe('peer file', () => {
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
				expect(route.children).toBeArrayOfSize(1);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'view.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(fixturePath, 'sub');
			});
		});

		describe('directory index file', () => {
			let route;
			beforeEach(() => { route = getChild('view', 'sub'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'index.js'));
			});

			it('has name according to directory name', () => {
				expect(route.name).toBe('sub');
			});

			it('has parent as parent', () => {
				expect(route.parent).toBe(getChild('view'));
			});

			it('has [PARENT_PATH] as defined', () => {
				expect(route[PARENT_PATH]).toBe('../view');
			});

			it('has children array containing children', () => {
				expect(route.children).toBeArrayOfSize(1);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub', 'index.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
			});
		});

		describe('peer of directory index', () => {
			let route;
			beforeEach(() => { route = getChild('view', 'sub', 'view'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'view.js'));
			});

			it('has name according to file name', () => {
				expect(route.name).toBe('view');
			});

			it('has parent as parent', () => {
				expect(route.parent).toBe(getChild('view', 'sub'));
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

	describe('directory peer on parent peer', () => {
		let fixturePath, root, getChild;
		beforeEach(async () => {
			fixturePath = getFixturePath('directory traversal', 'peer on peer');
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
		});

		describe('peer file', () => {
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
				expect(route.children).toBeArrayOfSize(1);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'view.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(fixturePath, 'sub');
			});
		});

		describe('directory index file', () => {
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

			it('has empty children array', () => {
				expect(route.children).toBeArrayOfSize(0);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub', 'index.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
			});
		});

		describe('peer of directory index', () => {
			let route;
			beforeEach(() => { route = getChild('view', 'onParentPeer'); });

			it('is a Route', () => {
				expect(route).toBeInstanceOf(Route);
			});

			it('is loaded from correct file', () => {
				expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'onParentPeer.js'));
			});

			it('has name according to file name', () => {
				expect(route.name).toBe('onParentPeer');
			});

			it('has parent as parent', () => {
				expect(route.parent).toBe(getChild('view'));
			});

			it('has [PARENT_PATH] as defined', () => {
				expect(route[PARENT_PATH]).toBe('../view');
			});

			it('has empty children array', () => {
				expect(route.children).toBeArrayOfSize(0);
			});

			it('has [SRC_PATH] set to file path', () => {
				expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub', 'onParentPeer.js'));
			});

			it('has [SRC_DIR_PATH] set to dir path', () => {
				expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
			});
		});
	});
});
