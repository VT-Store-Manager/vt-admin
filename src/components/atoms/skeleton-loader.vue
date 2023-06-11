<template>
	<v-skeleton-loader
		v-bind="{
			color: 'transparent',
			loading: true,
			...$attrs,
		}"
		class="skeleton-loader"
	/>
</template>

<style lang="scss" scoped>
.skeleton-loader {
	:deep(> *) {
		margin: 0;
	}
}
</style>
