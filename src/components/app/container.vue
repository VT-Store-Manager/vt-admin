<template>
	<main class="container">
		<h2>The container</h2>
		<slot></slot>
	</main>
</template>

<style lang="scss" scoped>
.container {
	background-color: $screen-color;
	flex: 1;
	padding: 1rem 1.5rem;
	border-radius: 10px;
}
</style>
