<template>
	<molecule-list-page-container page-name="Products">
		<template #subtitle>
			<p>{{ data?.length || '--' }} products</p>
		</template>
		<template #title-right>
			<atom-progress-circular
				v-show="pending"
				indeterminate
				:class="{ done: !pending }"
			/>
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
		<!-- <product-page-container v-show="!firstLoad" /> -->
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

// const product = useProduct()
// const firstLoad = ref(true)

// const refreshData = () => product.fetch({})

// refreshData()

// watch(
// 	() => product.loading,
// 	() => {
// 		if (!product.loading && firstLoad.value) {
// 			firstLoad.value = false
// 		}
// 	}
// )
const productList = useProductList()
const { data, pending } = storeToRefs(productList)
const { refresh } = productList
// productList.execute()
</script>
