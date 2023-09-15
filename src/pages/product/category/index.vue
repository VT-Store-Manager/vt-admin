<template>
	<molecule-list-page-container page-name="Danh sách phân loại">
		<template #subtitle>
			<p>{{ totalProduct || '--' }} loại</p>
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
		<template-new-product-category-dialog v-model:show="showCreateDialog" />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
const productCategoryList = useProductCategoryList()
const { totalProduct } = storeToRefs(productCategoryList)
const { refresh, pushQuery } = productCategoryList
const showCreateDialog = ref(false)

pushQuery()
</script>
