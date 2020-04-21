'use strict';

const Route = require('@overlook/route');
const {GET_PARENT_PATH} = require('@overlook/plugin-load');

class EditRoute extends Route {
	[GET_PARENT_PATH]() { // eslint-disable-line class-methods-use-this
		return './view';
	}
}

module.exports = new EditRoute({__filename});
