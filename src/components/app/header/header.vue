<template>
	<header class="header bg-secondary">
		<div class="header-left">
			<app-header-breadcrumbs />
		</div>
		<div class="header-center">
			<app-header-search-bar />
		</div>
		<div class="header-right">
			<app-header-action />
			<app-header-account />
		</div>
	</header>
</template>

<style lang="scss" scoped>
.header {
	height: $header-height;
	display: flex;
	justify-content: space-between;
	align-items: center;
	> * {
		display: flex;
		align-items: center;
	}
}
</style>
