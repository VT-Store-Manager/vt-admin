<template>
	<molecule-list-page-container page-name="Danh sách sản phẩm">
		<template #subtitle>
			<p>{{ totalProduct || '--' }} sản phẩm</p>
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
		<template-product-list />
		<template-product-create-dialog v-model:show="showCreateDialog" />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
const productList = useProductList()
const { totalProduct } = storeToRefs(productList)
const { refresh, pushQuery } = productList
const showCreateDialog = ref(false)
pushQuery()
</script>
