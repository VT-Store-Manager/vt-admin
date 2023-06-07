<template>
	<div class="wrapper bg-surface">
		<organism-sidebar />
		<main class="main custom-scrollbar">
			<organism-header />
			<slot></slot>
		</main>
	</div>
</template>

<style lang="scss" scoped>
.wrapper {
	display: flex;
	height: 100vh;

	.main {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		&::-webkit-scrollbar {
			width: 16px;
		}
	}
}
</style>
