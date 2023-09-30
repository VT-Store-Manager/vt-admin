const prettierConfig = JSON.parse(
	require('fs').readFileSync('./.prettierrc', 'utf-8')
)

module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
		'plugin:vue/vue3-essential',
		'plugin:vue/vue3-strongly-recommended',
		'plugin:prettier/recommended',
		'plugin:nuxt/recommended',
		'@nuxtjs/eslint-config-typescript',
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parser: '@typescript-eslint/parser',
	},
	plugins: ['vue'],
	rules: {
		'prettier/prettier': ['error', prettierConfig],

		// Vue eslint
		'vue/multi-word-component-names': 'off',
		'vue/valid-v-for': ['error'],
		'vue/valid-v-slot': 'off',
		'vue/no-unused-vars': [
			'warn',
			{
				ignorePattern: '^_',
			},
		],
		'vue/no-use-v-if-with-v-for': [
			'warn',
			{
				allowUsingIterationVar: true,
			},
		],
		'vue/require-default-prop': 'off',
		'vue/no-unused-components': 'warn',
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always',
					normal: 'never',
				},
			},
		],
		'vue/no-dupe-keys': 'warn',
		'vue/html-indent': 'off',
		'vue/singleline-html-element-content-newline': 'off',
		'vue/attribute-hyphenation': [
			'warn',
			'always',
			{
				ignore: ['I'],
			},
		],

		// Common
		'import/named': 'off',
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'never',
				functions: 'never',
			},
		],
		'no-tabs': 'off',
		indent: 'off',
		'no-unused-vars': 'off',
		'no-useless-escape': 'off',
		'no-irregular-whitespace': 'off',
		'arrow-parens': 'off',
		curly: 'off',
		'space-before-function-paren': 'off',
		'no-useless-return': 'off',
		'func-call-spacing': 'off',
		'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
		'import/no-named-as-default-member': 'off',

		// Typescript eslint
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^[_a-zA-z]',
				varsIgnorePattern: '^(_|props)',
			},
		],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-this-alias': 'off',
		'@typescript-eslint/no-var-requires': 'off',
	},
	overrides: [
		{
			files: ['**/*.d.ts'],
			rules: {
				'@typescript-eslint/no-unused-vars': 'off',
			},
		},
	],
	globals: {},
}
