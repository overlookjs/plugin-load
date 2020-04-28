'use strict';

// Exports

module.exports = {
	overrides: [
		{
			files: ['!.eslintrc.js'],
			parserOptions: {
				sourceType: 'module'
			},
			rules: {
				'node/no-unsupported-features/es-syntax': ['error', {ignores: ['modules', 'dynamicImport']}],
				// Disable rules which produce false errors
				'node/no-unpublished-import': ['off'],
				'node/no-extraneous-import': ['off'],
				'import/no-extraneous-dependencies': ['off']
			}
		}
	]
};
