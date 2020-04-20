'use strict';

const Route = require('@overlook/route');
const loadPlugin = require('@overlook/plugin-load');

const {INIT_PROPS} = Route;
const {IDENTIFY_ROUTE_FILE, GET_PARENT_PATH} = loadPlugin;

class ReactRoute extends Route {
	[INIT_PROPS](props) {
		super[INIT_PROPS](props);
		this.isReactRoute = true;
	}
}

class ReactEditRoute extends ReactRoute {
	[GET_PARENT_PATH]() { // eslint-disable-line class-methods-use-this
		return './view';
	}
}

class ReactLoadRoute extends ReactRoute.extend(loadPlugin) {
	[IDENTIFY_ROUTE_FILE](exts, isIndex, name) {
		const res = super[IDENTIFY_ROUTE_FILE](exts, isIndex, name);
		if (res) return res;
		if (exts.jsx) {
			if (isIndex) return {Class: ReactLoadRoute};
			if (name === 'edit') return {Class: ReactEditRoute};
			return {Class: ReactRoute};
		}
		return null;
	}
}

module.exports = new ReactLoadRoute();
