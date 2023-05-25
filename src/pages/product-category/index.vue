<template>
	<template-page-container page-name="Product category">
		<template #subtitle>
			<p>{{ productCategory.dataLen }} categories</p>
		</template>
		<template #title-right>
			<base-progress-circular
				v-show="productCategory.loading"
				:class="{ done: !productCategory.loading }"
			/>
			<button-refresh
				class="mr-3"
				title="Refresh data"
				@click="refreshData"
			/>
			<button-create @click="showCreateModal = true">
				New category
			</button-create>
			<product-category-create-modal
				:show="showCreateModal"
				@close-modal="showCreateModal = false"
				@created="refreshData"
			/>
		</template>
		<product-category-page-container v-show="!firstLoad" />
	</template-page-container>
</template>

<script lang="ts" setup>
const productCategory = useProductCategory()

const showCreateModal = ref(false)
const firstLoad = ref(true)

const refreshData = () => productCategory.fetch()

refreshData()

watch(
	() => productCategory.loading,
	() => {
		if (!productCategory.loading && firstLoad.value) firstLoad.value = false
	}
)
</script>
