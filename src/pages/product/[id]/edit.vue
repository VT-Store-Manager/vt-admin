<template>
	<molecule-list-page-container page-name="Product edit">
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Refresh data"
				@click="productDetail.productData?.refresh"
			/>
			<molecule-btn-delete
				disabled
				variant="tonal"
			>
				Cancel
			</molecule-btn-delete>
			<molecule-btn-save-dialog class="mr-3" />
		</template>
		<v-window v-model="tab">
			<v-window-item
				class="py-4 px-1"
				height="100%"
				value="info"
			>
				<template-product-edit-form />
			</v-window-item>
			<v-window-item
				class="py-4 px-1"
				height="100%"
				value="statistic"
			>
				Statistic
			</v-window-item>
		</v-window>
	</molecule-list-page-container>
</template>

<script setup lang="ts">
const route = useRoute()
const productDetail = useProductDetail()

productDetail.productId = route.params.id as string

const allTabs = ['info', 'statistic'] as const
const tab = ref<(typeof allTabs)[number]>('info')
</script>

<style scoped></style>
