<template>
	<div class="wrapper">
		<app-sidebar />
		<div class="main">
			<app-header />
			<app-container>
				<slot></slot>
			</app-container>
		</div>
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
	}
}
</style>
