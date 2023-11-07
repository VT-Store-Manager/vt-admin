module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'subject-case': [0, 'always'],
		'header-max-length': [0, 'always', 10000],
	},
	settings: {
		enableMultipleScopes: true,
	},
}
