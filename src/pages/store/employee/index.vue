<template>
	<molecule-list-page-container page-name="Danh sách nhân viên">
		<template #subtitle>
			<p>{{ totalCount || '--' }} nhân viên</p>
		</template>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Làm mới"
				@click="refresh"
			/>
			<molecule-btn-create @click="showCreateDialog = true">
				Tạo mới
			</molecule-btn-create>
		</template>
		<template-employee-list />
		<template-employee-create-dialog v-model:show="showCreateDialog" />
	</molecule-list-page-container>
</template>

<script setup lang="ts">
const employeeList = useEmployeeList()
const { totalCount } = storeToRefs(employeeList)
const { refresh, pushQuery } = employeeList
const showCreateDialog = ref(false)
pushQuery()
</script>

<style scoped></style>
