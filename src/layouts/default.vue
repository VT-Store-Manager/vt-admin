<template>
	<div class="wrapper">
		<app-sidebar />
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
		overflow-y: scroll;
		&::-webkit-scrollbar {
			width: 16px;
		}
	}
}
</style>
