<template>
	<molecule-list-page-container page-name="Phân quyền">
		<template #title-right>
			<molecule-btn-refresh
				title="Làm mới"
				class="mr-3"
				@click="roleStore.refresh"
			/>
			<molecule-btn-create @click="showCreateDialog = true">
				Tạo mới
			</molecule-btn-create>
		</template>
		<template-account-role-list />

		<template-new-role-dialog v-model:show="showCreateDialog" />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
const roleStore = useAccountAdminRoleList()
const { data } = storeToRefs(roleStore)
const showCreateDialog = ref(false)

const rolePermissionStore = useAdminRolePermission()

if (!data.value) {
	roleStore.refresh()
}
if (!rolePermissionStore.data) {
	rolePermissionStore.refresh()
}
</script>
