<template>
	<div class="wrapper bg-surface">
		<organism-sidebar />
		<main class="main custom-scrollbar">
			<organism-header />
			<div
				class="page-content flex-grow-1 d-flex flex-column relative overflow-hidden"
			>
				<slot></slot>
				<molecule-alert />
			</div>
		</main>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.wrapper {
	display: flex;
	height: 100vh;
	min-width: 1250px;

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
:deep(.v-snackbar__content) {
	padding: 0;
	.v-alert {
		margin-top: 10px;
		&:first-child {
			margin-top: 0;
		}
	}
}
</style>
