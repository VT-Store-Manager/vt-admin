<template>
	<header class="header">
		<div class="header-left">
			<molecule-breadcrumbs />
		</div>
		<div class="header-center">
			<molecule-header-search />
		</div>
		<div class="header-right">
			<molecule-header-action />
			<molecule-header-account />
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
