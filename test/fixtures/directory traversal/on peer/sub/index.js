'use strict';

const Route = require('@overlook/route');
const loadPlugin = require('@overlook/plugin-load');

const {PARENT_PATH} = loadPlugin;

const LoadRoute = Route.extend(loadPlugin);

module.exports = new LoadRoute({
	[PARENT_PATH]: '../view',
	__filename
});
