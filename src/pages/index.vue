<template>
	<molecule-list-page-container
		page-name="Dashboard"
		scroll
	>
		<template-statistic-overall-amount />
		<template-order-amount-chart />
	</molecule-list-page-container>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
:deep(span),
:deep(p) {
	color: #333;
}
</style>
