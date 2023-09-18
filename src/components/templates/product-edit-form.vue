<template>
	<v-sheet class="product-detail bg-transparent">
		<v-row class="card-container">
			<v-col cols="4">
				<atom-card class="pb-4 px-0">
					<template #title>
						<div class="d-flex align-center justify-space-between">
							<h4>Images</h4>
						</div>
					</template>
					<template #subtitle>
						{{ productData!.images.length || 0 }}/{{ maxFiles }} files
					</template>
					<template #item>
						<organism-file-panel :max-files="maxFiles" />
					</template>
				</atom-card>
			</v-col>
			<v-col cols="8">
				<atom-card>
					<template #title>
						<div class="d-flex align-center justify-space-between">
							<h4>Content</h4>
							<atom-btn
								class="font-weight-semibold"
								variant="tonal"
								color="danger"
								size="small"
							>
								Reset
							</atom-btn>
						</div>
					</template>
					<v-container class="content-form-container">
						<v-row>
							<v-col cols="8">
								<molecule-input
									input-type="text-field"
									label="Product name"
									:model-value="productData?.name"
								/>
							</v-col>
							<v-col cols="4">
								<molecule-input
									:model-value="productData?.category"
									input-type="select"
									label="Category"
									:items="productCategorySelect.data"
									:loading="productCategorySelect.pending"
									auto-select-first
									select-one
								/>
							</v-col>
							<v-col cols="12">
								<molecule-input
									:model-value="productData?.description"
									input-type="textarea"
									label="Product description"
								/>
							</v-col>
							<v-col cols="4">
								<molecule-input
									:model-value="productData?.originalPrice"
									input-type="number-field"
									label="Product price"
									suffix="đ"
									type="number"
									step="1000"
								/>
							</v-col>
							<v-col cols="8">
								<organism-product-option-select
									:model-value="productData?.options"
								/>
							</v-col>
						</v-row>
					</v-container>
				</atom-card>
			</v-col>
		</v-row>
	</v-sheet>
</template>

<script setup lang="ts">
const maxFiles = 4
const { productData } = storeToRefs(useProductDetail())
const productCategorySelect = useProductCategorySelect()
</script>

<style scoped></style>
