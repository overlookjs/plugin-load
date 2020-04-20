'use strict';

const Route = require('@overlook/route');
const {PARENT_PATH} = require('@overlook/plugin-load');

module.exports = new Route({
	[PARENT_PATH]: './view'
});
