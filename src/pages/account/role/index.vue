<template>
	<molecule-list-page-container page-name="Phân quyền">
		<template #title-right>
			<molecule-btn-refresh
				title="Làm mới"
				@click="roleStore.refresh"
			/>
		</template>
		<template-account-role-list />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
const roleStore = useAccountAdminRoleList()
const { data } = storeToRefs(roleStore)

if (!data.value) {
	roleStore.refresh()
}
</script>
