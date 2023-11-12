<template>
	<molecule-list-page-container page-name="Role edit">
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Refresh data"
				@click="refresh"
			/>
			<molecule-btn-delete
				disabled
				variant="tonal"
			>
				Cancel
			</molecule-btn-delete>
			<molecule-btn-save-dialog
				class="mr-3"
				:loading="status === 'pending'"
				@click="useEmit('save-role-edit')"
			/>
		</template>
		<template-account-role-edit />
	</molecule-list-page-container>
</template>

<script setup lang="ts">
const { refresh } = useAccountAdminRoleList()
const { status } = storeToRefs(useUpdateAccountRoleStore())
</script>

<style scoped></style>
