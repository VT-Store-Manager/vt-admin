<template>
	<template-page-container page-name="Product list">
		<template #subtitle>
			<p>{{ product.dataLen }} products</p>
		</template>
		<template #title-right>
			<base-progress-circular
				v-show="product.loading"
				:class="{ done: !product.loading }"
			/>
			<button-refresh
				class="mr-3"
				title="Refresh data"
				@click="refreshData"
			/>
			<button-create @click="$router.push('/product/create')">
				New product
			</button-create>
		</template>
		<product-page-container v-show="!firstLoad" />
	</template-page-container>
</template>

<script lang="ts" setup>
const product = useProduct()
const firstLoad = ref(true)

const refreshData = () => product.fetch({})

refreshData()

watch(
	() => product.loading,
	() => {
		if (!product.loading && firstLoad.value) {
			firstLoad.value = false
		}
	}
)
</script>
