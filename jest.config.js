/* --------------------
 * @overlook/plugin-load module
 * Jest config
 * ------------------*/

'use strict';

// Modules
const parseNodeVersion = require('parse-node-version');

// Exports

const supportsEsm = parseNodeVersion(process.version).major >= 13;

module.exports = {
	testEnvironment: 'node',
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['index.js', 'lib/**/*.js', 'es/**/*.js'],
	setupFilesAfterEnv: ['jest-extended', 'jest-expect-subclass'],
	moduleNameMapper: {
		'^@overlook/plugin-load($|/.*)': '<rootDir>$1'
	},
	// Skip ESM test - it's run with mocha instead
	testPathIgnorePatterns: ['<rootDir>/test/esm.test.js'],
	testMatch: ['**/__tests__/**/*.?(m)js', '**/?(*.)+(spec|test).?(m)js'],
	...(supportsEsm ? {moduleFileExtensions: ['js', 'mjs']} : null),
	transform: {}
};
