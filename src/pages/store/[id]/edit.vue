<template>
	<molecule-list-page-container
		page-name="Cập nhật cửa hàng"
		:page-title="
			storeData?.name
				? `Cập nhật cửa hàng ${storeData.name}`
				: 'Cập nhật cửa hàng'
		"
		scroll
	>
		<template #title-right>
			<molecule-btn-refresh
				title="Làm mới"
				@click="storeDetail.refresh"
			/>
			<molecule-btn-edit
				class="ml-3"
				@click="$router.push(`/store/${storeId}`)"
			>
				Chi tiết
			</molecule-btn-edit>
		</template>
		<template-store-edit class="mb-4" />
	</molecule-list-page-container>
</template>

<script setup lang="ts">
const storeDetail = useStoreDetail()
const { storeData } = storeToRefs(storeDetail)

const storeId = useRoute().params.id as string
if (storeId) {
	await storeDetail.fetch(storeId)
}
</script>
