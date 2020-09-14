/* --------------------
 * @overlook/plugin-load
 * Tests utils
 * ------------------*/

'use strict';

// Modules
const pathJoin = require('path').join;

// Imports
const modules = require('./index.js');

// Constants
const FIXTURES_PATH = pathJoin(__dirname, '..', 'fixtures');

// Exports

module.exports = {
	getFixturePath,
	loadFixture,
	createGetChild,
	expectToBeFileWithPath
};

function getFixturePath(...parts) {
	return pathJoin(FIXTURES_PATH, ...parts);
}

async function loadFixture(path) {
	const {Route, loadPlugin} = modules;

	const LoadRoute = Route.extend(loadPlugin);
	const tempParent = new LoadRoute();

	const route = await tempParent[loadPlugin.LOAD](path);

	route.parent = null;
	route[loadPlugin.PARENT_PATH] = null;

	return route;
}

function createGetChild(route) {
	return (...names) => getChild(route, ...names);
}

function getChild(route, ...names) {
	for (const name of names) {
		route = route.children.find(child => child.name === name);
		if (!route) return undefined;
	}
	return route;
}

function expectToBeFileWithPath(file, path) {
	expect(file).toBeInstanceOf(modules.fsPlugin.File);
	expect(file).toEqual({path, content: undefined});
}
