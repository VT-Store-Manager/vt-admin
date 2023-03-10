import vuetify from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	srcDir: './src',
	css: ['~/assets/css/normalize.css', '~/assets/scss/main.scss'],
	imports: {
		dirs: ['composables/**']
	},
	build: {
		transpile: ['vuetify']
	},
	vite: {
		ssr: {
			noExternal: ['vuetify']
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
					@import "~/assets/scss/variable";
					@import "~/assets/scss/animation";
					@import "~/assets/scss/components";
					@import "~/assets/scss/scrollbar";
					`
				}
			}
		}
	},
	components: [
		{
			path: '~/components'
		},
		{
			path: '~/components/base/button',
			pathPrefix: false
		}
	],
	hooks: {
		'vite:extendConfig': config => {
			config.plugins?.push(vuetify())
		}
	},
	modules: [
		'@nuxt/image-edge',
		'@nuxtjs/google-fonts',
		'@pinia/nuxt',
		'@vueuse/nuxt'
	],
	image: {},
	googleFonts: {
		families: {
			'Noto Sans': {
				wght: [300, 400, 500, 600, 700, 900]
			}
		}
		// display: 'fallback',
	},
	pinia: {
		autoImports: ['defineStore', ['defineStore', 'definePiniaStore']]
	},
	postcss: {
		plugins: {
			autoprefixer: {},
			'postcss-import': {},
			'postcss-url': {},
			...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
		}
	},
	runtimeConfig: {
		public: {
			apiBase: process.env.API_BASE,
			imgResourceUrl: `${process.env.API_BASE}/file/render?key=`
		}
	}
})
