import { useTheme } from 'vuetify'
import { AppTheme } from '~/constants'

export const useThemeUtil = definePiniaStore('theme-util', () => {
	const theme = useTheme()

	const isDark = computed(() => theme.global.current.value.dark)
	const isLight = computed(() => !theme.global.current.value.dark)
	const themeName = computed<AppTheme>(() => theme.global.name.value as any)

	const setTheme = (name: AppTheme) => {
		theme.global.name.value = name
	}

	return { isDark, isLight, themeName, setTheme }
})
