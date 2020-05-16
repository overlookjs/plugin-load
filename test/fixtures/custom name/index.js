'use strict';

const Route = require('@overlook/route');
const loadPlugin = require('@overlook/plugin-load');

const LoadRoute = Route.extend(loadPlugin);

module.exports = new LoadRoute({
	name: 'xRoot',
	__filename
});
