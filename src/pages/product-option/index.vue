<template>
	<template-page-container page-name="Product option">
		<template #subtitle>
			<p>{{ productOption.dataLen }} options</p>
		</template>
		<template #title-right>
			<base-progress-circular
				v-show="productOption.loading"
				:class="{ done: !productOption.loading }"
			/>
			<button-refresh
				class="mr-3"
				title="Refresh data"
				@click="refreshData"
			/>
			<button-create @click="showCreateModal = true">
				New option
			</button-create>
			<product-option-create-modal
				:show="showCreateModal"
				@created="refreshData"
				@close-modal="showCreateModal = false"
			/>
		</template>
		<product-option-page-container v-show="!firstLoad" />
	</template-page-container>
</template>

<script lang="ts" setup>
const productOption = useProductOption()

const showCreateModal = ref(false)
const firstLoad = ref(true)

const refreshData = () => productOption.fetch()

refreshData()

watch(
	() => productOption.loading,
	() => {
		if (!productOption.loading && firstLoad.value) firstLoad.value = false
	}
)
</script>
