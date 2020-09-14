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
let Route, SRC_PATH, SRC_DIR_PATH, SRC_FILENAME;
beforeEach(() => {
	({Route} = modules);
	({SRC_PATH, SRC_DIR_PATH, SRC_FILENAME} = modules.loadPlugin);
});

describe('does not over-write existing name prop', () => {
	let fixturePath, root, getChild;
	beforeEach(async () => {
		fixturePath = getFixturePath('custom name');
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

		it('has name as defined', () => {
			expect(root.name).toBe('xRoot');
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
		beforeEach(() => { route = getChild('xView'); });

		it('is a Route', () => {
			expect(route).toBeInstanceOf(Route);
		});

		it('is loaded from correct file', () => {
			expect(route.__filename).toBe(pathJoin(fixturePath, 'view.js'));
		});

		it('has name as defined', () => {
			expect(route.name).toBe('xView');
		});

		it('has empty children array', () => {
			expect(route.children).toBeArrayOfSize(0);
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

	describe('directory', () => {
		let route;
		beforeEach(() => { route = getChild('xSub'); });

		it('is a Route', () => {
			expect(route).toBeInstanceOf(Route);
		});

		it('is loaded from correct file', () => {
			expect(route.__filename).toBe(pathJoin(fixturePath, 'sub/index.js'));
		});

		it('has name as defined', () => {
			expect(route.name).toBe('xSub');
		});

		it('has empty children array', () => {
			expect(route.children).toBeArrayOfSize(0);
		});

		it('has [SRC_PATH] set to file path', () => {
			expect(route[SRC_PATH]).toBe(pathJoin(fixturePath, 'sub/index.js'));
		});

		it('has [SRC_DIR_PATH] set to dir path', () => {
			expect(route[SRC_DIR_PATH]).toBe(pathJoin(fixturePath, 'sub'));
		});

		it('has [SRC_FILENAME] set to file name', () => {
			expect(route[SRC_FILENAME]).toBe('index');
		});
	});
});
