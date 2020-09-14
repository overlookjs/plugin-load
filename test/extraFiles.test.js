/* --------------------
 * @overlook/plugin-load module
 * Tests
 * ------------------*/

/* eslint-disable jest/no-standalone-expect */

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

// Refresh load plugin symbols before each test
let FILES;
beforeEach(() => {
	FILES = modules.loadPlugin.FILES;
});

describe('extra files attached to routes', () => {
	let fixturePath, root, getChild;
	beforeEach(async () => {
		fixturePath = getFixturePath('extra files');
		root = await loadFixture(fixturePath);
		getChild = createGetChild(root);

		expect(root.__filename).toBe(pathJoin(fixturePath, 'index.js'));
	});

	describe('root', () => {
		it('route file', () => {
			expectToBeFileWithPath(root[FILES].js, pathJoin(fixturePath, 'index.js'));
		});

		it('file with another ext', () => {
			expectToBeFileWithPath(root[FILES].jsx, pathJoin(fixturePath, 'index.jsx'));
		});

		it('file with a .*.js ext', () => {
			expectToBeFileWithPath(root[FILES]['inc.js'], pathJoin(fixturePath, 'index.inc.js'));
		});

		it('no other files', () => {
			expect(root[FILES]).toBeObject();
			expect(root[FILES]).toContainAllKeys(['js', 'jsx', 'inc.js']);
		});
	});

	describe('peer', () => {
		let route;
		beforeEach(() => {
			route = getChild('view');
			expect(route.__filename).toBe(pathJoin(fixturePath, 'view.js'));
		});

		it('route file', () => {
			expectToBeFileWithPath(route[FILES].js, pathJoin(fixturePath, 'view.js'));
		});

		it('file with another ext', () => {
			expectToBeFileWithPath(route[FILES].jsx, pathJoin(fixturePath, 'view.jsx'));
		});

		it('file with a .*.js ext', () => {
			expectToBeFileWithPath(route[FILES]['inc.js'], pathJoin(fixturePath, 'view.inc.js'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['js', 'jsx', 'inc.js']);
		});
	});

	describe('subfolder index', () => {
		let route;
		beforeEach(() => {
			route = getChild('sub');
			expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'index.js'));
		});

		it('route file', () => {
			expectToBeFileWithPath(route[FILES].js, pathJoin(fixturePath, 'sub/index.js'));
		});

		it('file with another ext', () => {
			expectToBeFileWithPath(route[FILES].jsx, pathJoin(fixturePath, 'sub/index.jsx'));
		});

		it('file with a .*.js ext', () => {
			expectToBeFileWithPath(route[FILES]['inc.js'], pathJoin(fixturePath, 'sub/index.inc.js'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['js', 'jsx', 'inc.js']);
		});
	});

	describe('subfolder peer', () => {
		let route;
		beforeEach(() => {
			route = getChild('sub', 'view');
			expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'view.js'));
		});

		it('route file', () => {
			expectToBeFileWithPath(route[FILES].js, pathJoin(fixturePath, 'sub/view.js'));
		});

		it('file with another ext', () => {
			expectToBeFileWithPath(route[FILES].jsx, pathJoin(fixturePath, 'sub/view.jsx'));
		});

		it('file with a .*.js ext', () => {
			expectToBeFileWithPath(route[FILES]['inc.js'], pathJoin(fixturePath, 'sub/view.inc.js'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['js', 'jsx', 'inc.js']);
		});
	});

	describe('2nd level subfolder index', () => {
		let route;
		beforeEach(() => {
			route = getChild('sub', 'subSub');
			expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'index.js'));
		});

		it('route file', () => {
			expectToBeFileWithPath(route[FILES].js, pathJoin(fixturePath, 'sub/subSub/index.js'));
		});

		it('file with another ext', () => {
			expectToBeFileWithPath(route[FILES].jsx, pathJoin(fixturePath, 'sub/subSub/index.jsx'));
		});

		it('file with a .*.js ext', () => {
			expectToBeFileWithPath(route[FILES]['inc.js'], pathJoin(fixturePath, 'sub/subSub/index.inc.js'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['js', 'jsx', 'inc.js']);
		});
	});

	describe('2nd level subfolder peer', () => {
		let route;
		beforeEach(() => {
			route = getChild('sub', 'subSub', 'view');
			expect(route.__filename).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'view.js'));
		});

		it('route file', () => {
			expectToBeFileWithPath(route[FILES].js, pathJoin(fixturePath, 'sub/subSub/view.js'));
		});

		it('file with another ext', () => {
			expectToBeFileWithPath(route[FILES].jsx, pathJoin(fixturePath, 'sub/subSub/view.jsx'));
		});

		it('file with a .*.js ext', () => {
			expectToBeFileWithPath(route[FILES]['inc.js'], pathJoin(fixturePath, 'sub/subSub/view.inc.js'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['js', 'jsx', 'inc.js']);
		});
	});
});
