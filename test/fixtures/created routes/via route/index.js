'use strict';

const Route = require('@overlook/route');
const loadPlugin = require('@overlook/plugin-load');

const {INIT_PROPS} = Route;
const {IDENTIFY_ROUTE_FILE, PARENT_PATH} = loadPlugin;

class ReactRoute extends Route {
	[INIT_PROPS](props) {
		super[INIT_PROPS](props);
		this.isReactRoute = true;
	}
}

class ReactLoadRoute extends ReactRoute.extend(loadPlugin) {
	[IDENTIFY_ROUTE_FILE](exts, isIndex, name) {
		const res = super[IDENTIFY_ROUTE_FILE](exts, isIndex, name);
		if (res) return res;
		if (exts.jsx) {
			if (isIndex) return new ReactLoadRoute();
			const route = new ReactRoute();
			if (name === 'edit') route[PARENT_PATH] = './view';
			return route;
		}
		return undefined;
	}
}

module.exports = new ReactLoadRoute({__filename});
