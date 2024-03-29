import vuetify from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	srcDir: './src',
	css: ['~/assets/css/normalize.css', '~/assets/scss/main.scss'],
	imports: {
		dirs: [
			'composables/**',
			'config/**',
			'components/**',
			'utils/**',
			'constants/**',
		],
	},
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
		layoutTransition: { name: 'layout', mode: 'out-in' },
	},
	build: {
		transpile: ['vuetify'],
	},
	experimental: {
		payloadExtraction: false,
	},
	nitro: {
		compressPublicAssets: true,
		prerender: {
			crawlLinks: true,
		},
	},
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
					@import "~/assets/scss/components";
					@import "~/assets/scss/scrollbar";
					`,
				},
			},
		},
		// build: {
		// 	chunkSizeWarningLimit: 1024,
		// 	sourcemap: 'hidden',
		// },
		vue: {
			script: {
				defineModel: true,
				propsDestructure: true,
			},
		},
	},
	components: [
		'~/components',
		{
			path: '~/components/atoms',
			prefix: 'atom',
		},
		{
			path: '~/components/molecules',
			prefix: 'molecule',
		},
		{
			path: '~/components/organisms',
			prefix: 'organism',
		},
		{
			path: '~/components/templates',
			prefix: 'template',
		},
	],
	hooks: {
		'vite:extendConfig': config => {
			config.plugins?.push(vuetify({}))
		},
	},
	modules: [
		'@nuxtjs/google-fonts',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxt/devtools',
	],
	googleFonts: {
		families: {
			'Noto Sans': {
				wght: [300, 400, 500, 600, 700, 900],
			},
		},
		display: 'fallback',
		preload: true,
		download: false,
	},
	pinia: {
		autoImports: [
			'defineStore',
			'storeToRefs',
			'acceptHMRUpdate',
			['defineStore', 'definePiniaStore'],
		],
	},
	postcss: {
		plugins: {
			autoprefixer: {},
			'postcss-import': {},
			'postcss-url': {},
			...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
		},
	},
	runtimeConfig: {
		public: {
			apiBase: process.env.API_BASE,
		},
	},
})
