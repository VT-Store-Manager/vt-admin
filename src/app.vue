<template>
	<v-app>
		<nuxt-layout>
			<nuxt-page />
		</nuxt-layout>
	</v-app>
</template>

<script lang="ts" setup>
import { AppTheme, GLOBAL_THEME_KEY } from './constants'

const { setTheme } = useThemeUtil()
setTheme(
	useCookie(GLOBAL_THEME_KEY, {
		default: () => AppTheme.LIGHT,
	}).value
)
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
	transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
</style>
