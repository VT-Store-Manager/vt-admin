import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { fa } from 'vuetify/iconsets/fa-svg'
import { aliases as mdiAliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as labComponents from 'vuetify/labs/components'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faEye,
	faMoon,
	faPenToSquare,
	faSun,
	faTrashCan,
} from '@fortawesome/free-regular-svg-icons'
import {
	faArrowLeft,
	faCaretLeft,
	faCaretRight,
	faCheckCircle,
	faCircleMinus,
	faCirclePlus,
	faCircleXmark,
	faMars,
	faMarsAndVenus,
	faMoneyCheck,
	faPlus,
	faRotateRight,
	faTruckFast,
	faUser,
	faVenus,
	faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
	faArrowLeft,
	faXmark,
	faTruckFast,
	faMars,
	faVenus,
	faMarsAndVenus,
	faMoneyCheck,
	faUser,
	faCheckCircle,
	faCircleXmark
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
		background: '#F0F0F0',
		surface: '#FFFFFF',
		input: '#F3F3F3',
		danger: '#f44336',
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
		danger: '#f44336',
		warning: '#d98100',
		info: '#29b6f6',
		success: '#66bb6a',
	},
}

export default defineNuxtPlugin(nuxtApp => {
	const vuetify = createVuetify({
		ssr: true,
		components: {
			...components,
			...labComponents,
		},
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
		defaults: {
			VBtn: {
				style: 'text-transform: none;',
			},
		},
	})
	nuxtApp.vueApp.use(vuetify)
	nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
