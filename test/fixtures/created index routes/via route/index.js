'use strict';

const Route = require('@overlook/route');
const loadPlugin = require('@overlook/plugin-load');

const {INIT_PROPS} = Route;
const {IDENTIFY_ROUTE_FILE} = loadPlugin;

const LoadRoute = Route.extend(loadPlugin);

class IndexLoadRoute extends LoadRoute {
	[INIT_PROPS](props) {
		super[INIT_PROPS](props);
		this._isIndexRoute = true;
	}

	[IDENTIFY_ROUTE_FILE](exts, isIndex, name) {
		const res = super[IDENTIFY_ROUTE_FILE](exts, isIndex, name);
		if (res) return res;
		if (isIndex && Object.keys(exts).length === 0) return new IndexLoadRoute();
		return undefined;
	}
}

module.exports = new IndexLoadRoute({__filename});
