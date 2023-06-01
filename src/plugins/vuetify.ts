import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases as mdiAliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { fa } from 'vuetify/iconsets/fa-svg'
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faPlus,
	faCaretLeft,
	faCaretRight,
	faCirclePlus,
	faCircleMinus,
	faRotateRight,
} from '@fortawesome/free-solid-svg-icons'
import {
	faEye,
	faPenToSquare,
	faTrashCan,
	faMoon,
	faSun,
} from '@fortawesome/free-regular-svg-icons'

library.add(
	faPlus,
	faPenToSquare,
	faEye,
	faTrashCan,
	faMoon,
	faSun,
	faCaretLeft,
	faCaretRight,
	faCirclePlus,
	faCircleMinus,
	faRotateRight
)
const lightTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: '#EF6C00',
		'primary-darken': '#E65100',
		'primary-lighten': '#FFA726',
		'primary-color-lighten-2': '#ffe0b2',
		'primary-color-lighten-3': '#fdf4e5',
		secondary: '#FFFFFF',
		screen: '#F4F4F4',
		'dark-grey': '#212121',
		grey: '#363636',
	},
}
const darkTheme: ThemeDefinition = {
	dark: true,
	colors: {
		primary: '#EF6C00',
		'primary-darken': '#E65100',
		'primary-lighten': '#FFA726',
		secondary: '#1b1e2b',
		screen: '#010413',
		'primary-color-lighten-2': '#ffe0b2',
		'primary-color-lighten-3': '#fdf4e5',
		'dark-grey': '#212121',
		grey: '#363636',
	},
}

export default defineNuxtPlugin(nuxtApp => {
	const vuetify = createVuetify({
		ssr: true,
		components,
		directives,
		icons: {
			defaultSet: 'mdi',
			aliases: mdiAliases,
			sets: {
				mdi,
				fa,
			},
		},
		theme: {
			defaultTheme: 'light',
			themes: {
				light: lightTheme,
				dark: darkTheme,
			},
		},
	})
	nuxtApp.vueApp.use(vuetify)
	nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
