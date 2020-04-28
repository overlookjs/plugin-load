/* --------------------
 * @overlook/plugin-load module
 * Jest config
 * ------------------*/

'use strict';

// Exports

module.exports = {
	testEnvironment: 'node',
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['index.js', 'lib/**/*.js'],
	setupFilesAfterEnv: ['jest-extended'],
	moduleNameMapper: {
		'^@overlook/plugin-load$': '<rootDir>/index.js'
	},
	// Skip ESM test - it's run with mocha instead
	testPathIgnorePatterns: ['<rootDir>/test/esm.test.js']
};
