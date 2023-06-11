<template>
	<molecule-list-page-container
		page-name="Sales"
		page-title="Sale accounts"
	>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Refresh data"
			/>
			<molecule-btn-create> New </molecule-btn-create>
		</template>
	</molecule-list-page-container>
</template>

<script lang="ts" setup></script>
