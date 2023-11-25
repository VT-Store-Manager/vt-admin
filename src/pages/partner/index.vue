<template>
	<molecule-list-page-container page-name="Đối tác ưu đãi">
		<template #subtitle>
			<p>{{ totalCount }} đối tác</p>
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
		<template-partner-list />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
const partnerList = usePartnerList()
const { totalCount } = storeToRefs(partnerList)
const { refresh } = partnerList
const showCreateDialog = ref(false)
</script>
