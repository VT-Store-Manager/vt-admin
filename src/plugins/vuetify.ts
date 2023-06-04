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
	faArrowLeft,
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
	faRotateRight,
	faArrowLeft
)

// #F6F1E9
// #FFD93D
// #EF6C00
// #4F200D

const lightTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: '#EF6C00',
		'primary-darken': '#4F200D',
		'primary-lighten': '#FFD93D',
		secondary: '#F6F1E9',
		background: '#F4F4f4',
		surface: '#FFFFFF',
		error: '#f44336',
		warning: '#ffa726',
		info: '#29b6f6',
		success: '#66bb6a',
	},
}
const darkTheme: ThemeDefinition = {
	dark: true,
	colors: {
		primary: '#EF6C00',
		'primary-darken': '#E16428',
		'primary-lighten': '#FFD93D',
		secondary: '#F6F1E9',
		background: '#272121',
		surface: '#363333',
		error: '#f44336',
		warning: '#ffa726',
		info: '#29b6f6',
		success: '#66bb6a',
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
