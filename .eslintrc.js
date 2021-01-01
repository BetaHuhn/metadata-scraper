module.exports = {
	...require('@betahuhn/config').eslint,
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint'
	],
	extends: [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	rules: {
		'func-style': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'@typescript-eslint/no-var-requires': 0
	}
}