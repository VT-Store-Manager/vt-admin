<template>
	<molecule-list-page-container page-name="Danh sách phân loại">
		<template #subtitle>
			<p>{{ totalCount || '--' }} loại</p>
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
		<template-product-category-list />
		<template-product-category-create-dialog v-model:show="showCreateDialog" />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
const productCategoryList = useProductCategoryList()
const { totalCount } = storeToRefs(productCategoryList)
const { refresh } = productCategoryList
const showCreateDialog = ref(false)
</script>
