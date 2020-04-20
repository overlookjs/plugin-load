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
	});

	describe('root', () => {
		it('route file', () => {
			expect(root[FILES].js).toBe(pathJoin(fixturePath, 'index.js'));
		});

		it('file with another ext', () => {
			expect(root[FILES].jsx).toBe(pathJoin(fixturePath, 'index.jsx'));
		});

		it('file with a .*.js ext', () => {
			expect(root[FILES]['inc.js']).toBe(pathJoin(fixturePath, 'index.inc.js'));
		});

		it('no other files', () => {
			expect(root[FILES]).toBeObject();
			expect(root[FILES]).toContainAllKeys(['js', 'jsx', 'inc.js']);
		});
	});

	describe('peer', () => {
		let route;
		beforeEach(() => { route = getChild('view'); });

		it('route file', () => {
			expect(route[FILES].js).toBe(pathJoin(fixturePath, 'view.js'));
		});

		it('file with another ext', () => {
			expect(route[FILES].jsx).toBe(pathJoin(fixturePath, 'view.jsx'));
		});

		it('file with a .*.js ext', () => {
			expect(route[FILES]['inc.js']).toBe(pathJoin(fixturePath, 'view.inc.js'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['js', 'jsx', 'inc.js']);
		});
	});

	describe('subfolder index', () => {
		let route;
		beforeEach(() => { route = getChild('sub'); });

		it('route file', () => {
			expect(route[FILES].js).toBe(pathJoin(fixturePath, 'sub', 'index.js'));
		});

		it('file with another ext', () => {
			expect(route[FILES].jsx).toBe(pathJoin(fixturePath, 'sub', 'index.jsx'));
		});

		it('file with a .*.js ext', () => {
			expect(route[FILES]['inc.js']).toBe(pathJoin(fixturePath, 'sub', 'index.inc.js'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['js', 'jsx', 'inc.js']);
		});
	});

	describe('subfolder peer', () => {
		let route;
		beforeEach(() => { route = getChild('sub', 'view'); });

		it('route file', () => {
			expect(route[FILES].js).toBe(pathJoin(fixturePath, 'sub', 'view.js'));
		});

		it('file with another ext', () => {
			expect(route[FILES].jsx).toBe(pathJoin(fixturePath, 'sub', 'view.jsx'));
		});

		it('file with a .*.js ext', () => {
			expect(route[FILES]['inc.js']).toBe(pathJoin(fixturePath, 'sub', 'view.inc.js'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['js', 'jsx', 'inc.js']);
		});
	});

	describe('2nd level subfolder index', () => {
		let route;
		beforeEach(() => { route = getChild('sub', 'subSub'); });

		it('route file', () => {
			expect(route[FILES].js).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'index.js'));
		});

		it('file with another ext', () => {
			expect(route[FILES].jsx).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'index.jsx'));
		});

		it('file with a .*.js ext', () => {
			expect(route[FILES]['inc.js']).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'index.inc.js'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['js', 'jsx', 'inc.js']);
		});
	});

	describe('2nd level subfolder peer', () => {
		let route;
		beforeEach(() => { route = getChild('sub', 'subSub', 'view'); });

		it('route file', () => {
			expect(route[FILES].js).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'view.js'));
		});

		it('file with another ext', () => {
			expect(route[FILES].jsx).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'view.jsx'));
		});

		it('file with a .*.js ext', () => {
			expect(route[FILES]['inc.js']).toBe(pathJoin(fixturePath, 'sub', 'subSub', 'view.inc.js'));
		});

		it('no other files', () => {
			expect(route[FILES]).toBeObject();
			expect(route[FILES]).toContainAllKeys(['js', 'jsx', 'inc.js']);
		});
	});
});
