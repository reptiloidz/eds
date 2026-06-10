/** @type {import('prettier').Config} */
module.exports = {
	singleQuote: true,
	arrowParens: 'avoid',
	useTabs: true,
	tabWidth: 4,
	printWidth: 120,
	singleAttributePerLine: true,
	plugins: [require('./prettier-plugin-void-html-angular.cjs')],
};
