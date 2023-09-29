<template>
	<v-app>
		<nuxt-layout>
			<nuxt-page />
		</nuxt-layout>
	</v-app>
</template>

<script lang="ts" setup>
import { AppTheme, GLOBAL_THEME_KEY } from './constants'
const { auth } = storeToRefs(useAuthStore())
const { setTheme } = useThemeUtil()
setTheme(
	useCookie(GLOBAL_THEME_KEY, {
		default: () => AppTheme.LIGHT,
		maxAge: 60 * 60 * 24 * 365,
	}).value
)

if (auth.value?.accessToken) {
	useRequest('/auth/check')
}
</script>

<style lang="scss">
.page {
	&-enter-active,
	&-leave-active {
		transition: all 0.4s;
	}
	&-enter-from,
	&-leave-to {
		opacity: 0;
		filter: grayscale(1);
		transform: translate(20px, 0);
		opacity: 0;
	}
}
.layout {
	&-enter-active,
	&-leave-active {
		transition: all 0.4s;
	}
	&-enter-from,
	&-leave-to {
		opacity: 0;
		filter: grayscale(1);
		transform: translate(20px, 0);
		opacity: 0;
	}
}
</style>
