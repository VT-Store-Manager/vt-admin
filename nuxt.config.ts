import vuetify from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	srcDir: './src',
	css: [
		'vuetify/styles',
		'@mdi/font/css/materialdesignicons.css',
		'~/assets/css/tailwind.css',
		'~/assets/css/normalize.css',
		'~/assets/scss/main.scss',
	],
	vite: {
		ssr: {
			noExternal: ['vuetify'],
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
					@import "~/assets/scss/variable";
					@import "~/assets/scss/animation";
					@import "~/assets/scss/vuetify";
					@import "~/assets/scss/scrollbar";
					`,
				},
			},
		},
	},
	components: [
		{
			path: '~/components',
		},
		{
			path: '~/components/base',
			pathPrefix: false,
		},
	],
	modules: [
		async (options, nuxt) => {
			nuxt.hooks.hook('vite:extendConfig', config => {
				config.plugins?.push(vuetify())
			})
		},
		'@nuxt/image-edge',
		'@nuxtjs/google-fonts',
		'@pinia/nuxt',
	],
	image: {},
	googleFonts: {
		families: {
			'Noto+Sans': {
				wght: [300, 400, 500, 600, 700, 900],
			},
		},
		display: 'fallback',
	},
	pinia: {
		autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
	},
	postcss: {
		plugins: {
			autoprefixer: {},
			'postcss-import': {},
			'postcss-url': {},
			...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
		},
	},
})
