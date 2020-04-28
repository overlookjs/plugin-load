/* --------------------
 * @overlook/plugin-load module
 * ESLint config
 * ------------------*/

'use strict';

// Exports

module.exports = {
	extends: [
		'@overlookmotel/eslint-config',
		'@overlookmotel/eslint-config-node'
	],
	// Parse dynamic `import()` (used in `lib/loadFile.js`)
	parser: 'babel-eslint'
};
