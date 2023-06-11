<template>
	<molecule-list-page-container page-name="Products">
		<template #subtitle>
			<p>{{ totalProduct || '--' }} products</p>
		</template>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Refresh data"
				@click="refresh"
			/>
			<molecule-btn-create @click="$router.push('/product/create')">
				New
			</molecule-btn-create>
		</template>
		<template-product-list />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const productList = useProductList()
const { totalProduct } = storeToRefs(productList)
const { refresh, pushQuery } = productList

pushQuery()
</script>
