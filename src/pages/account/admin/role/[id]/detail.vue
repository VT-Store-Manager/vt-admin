<template>
	<molecule-list-page-container page-name="Role edit">
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Refresh data"
				@click="roleListStore.refresh"
			/>
			<molecule-btn-delete
				disabled
				variant="tonal"
			>
				Cancel
			</molecule-btn-delete>
		</template>
	</molecule-list-page-container>
</template>

<script setup lang="ts">
const route = useRoute()
const roleListStore = useAccountAdminRoleList()
const roleId = route.params.id as string

const roleDetail = computed(() => {
	return roleListStore.roleMap.get(roleId)!
})

watch(roleDetail, value => {
	if (!value) {
		throw createError({
			statusCode: 404,
			statusMessage: `Role ID ${roleId} not found`,
		})
	}
})
</script>

<style scoped></style>
