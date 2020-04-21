'use strict';

const Route = require('@overlook/route');
const loadPlugin = require('@overlook/plugin-load');

const {GET_DIR_INDEX} = loadPlugin;

const LoadRoute = Route.extend(loadPlugin);

class LoadDashedIndexRoute extends LoadRoute {
	[GET_DIR_INDEX]() { // eslint-disable-line class-methods-use-this
		return '_index';
	}
}

module.exports = new LoadDashedIndexRoute({__filename});
