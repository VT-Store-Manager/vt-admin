<template>
	<v-app>
		<nuxt-layout>
			<nuxt-page />
		</nuxt-layout>
	</v-app>
</template>

<style lang="scss" scoped>
.v-application {
	min-width: 1250px;
}
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
