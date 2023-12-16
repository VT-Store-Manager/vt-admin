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
		maxAge: 60 * 60 * 24 * 365,
	}).value
)
</script>

<style lang="scss">
.page {
	&-enter-active,
	&-leave-active {
		transition: all 0.2s;
	}
	&-enter-from,
	&-leave-to {
		opacity: 0;
		filter: grayscale(1);
	}
}
.layout {
	&-enter-active,
	&-leave-active {
		transition: all 0.2s;
	}
	&-enter-from,
	&-leave-to {
		opacity: 0;
		filter: grayscale(1);
		transform: translate(20px, 0);
	}
}
</style>
