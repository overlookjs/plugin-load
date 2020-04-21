'use strict';

const Route = require('@overlook/route');
const loadPlugin = require('@overlook/plugin-load');

const {DIR_INDEX} = loadPlugin;

const LoadRoute = Route.extend(loadPlugin);

module.exports = new LoadRoute({
	[DIR_INDEX]: '_index',
	__filename
});
