import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const lightTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: '#EF6C00',
		'primary-darken': '#E65100',
		'primary-lighten': '#FFA726',
		secondary: '#FFFFFF',
		screen: '#F4F4F4',
		'text-black': '#212121',
		'text-black-blur': '#363636',
	},
}

export default defineNuxtPlugin(nuxtApp => {
	const vuetify = createVuetify({
		components,
		directives,
		icons: {
			defaultSet: 'mdi',
			aliases,
			sets: {
				mdi,
			},
		},
		theme: {
			defaultTheme: 'light',
			themes: {
				light: lightTheme,
			},
		},
	})

	nuxtApp.vueApp.use(vuetify)
})
