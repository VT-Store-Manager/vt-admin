<template>
	<molecule-list-page-container page-name="Product categories">
		<template #subtitle>
			<p>{{ totalProduct || '--' }} categories</p>
		</template>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Refresh data"
				@click="refresh"
			/>
			<molecule-btn-create @click="$router.push('/product-category/create')">
				New
			</molecule-btn-create>
		</template>
		<template-product-category-list />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const productCategoryList = useProductCategoryList()
const { totalProduct } = storeToRefs(productCategoryList)
const { refresh, pushQuery } = productCategoryList

pushQuery()
</script>
