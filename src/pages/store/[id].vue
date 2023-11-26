<template>
	<molecule-list-page-container
		page-name="Chi tiết cửa hàng"
		:page-title="
			storeData?.name ? `Cửa hàng ${storeData.name}` : 'Chi tiết cửa hàng'
		"
		scroll
	>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Làm mới"
				@click="storeDetail.refresh"
			/>
			<molecule-btn-delete
				disabled
				class="mr-3"
			>
				Ẩn
			</molecule-btn-delete>
			<molecule-btn-edit> Chỉnh sửa </molecule-btn-edit>
		</template>
		<template-store-detail />
	</molecule-list-page-container>
</template>

<script setup lang="ts">
const storeDetail = useStoreDetail()
const { storeData } = storeToRefs(storeDetail)

const storeId = useRoute().params.id as string
if (storeId) {
	storeDetail.fetch(storeId)
}
</script>

<style scoped></style>
