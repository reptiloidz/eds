/* eslint-env node */
module.exports = {
	root: true,
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['@typescript-eslint'],
	overrides: [
		{
			files: ['*.ts'],
			extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
			parser: '@typescript-eslint/parser',
			rules: {
				semi: 'error',
				'@typescript-eslint/no-explicit-any': 0,
			},
		},
		{
			files: ['**/*.html'],
			parser: '@angular-eslint/template-parser',
			plugins: ['@angular-eslint/template'],
			rules: {
				'max-len': [
					'error',
					{
						code: 120,
						ignoreUrls: true,
					},
				],
			},
		},
	],
};
