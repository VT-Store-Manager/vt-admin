<template>
	<molecule-dialog
		v-model="show"
		:card-attrs="{}"
		:sheet-attrs="{
			width: '95%',
			maxWidth: '1200px',
		}"
		title="New product"
		persistent
		:error-message="createProduct.error?.data?.message"
		:status="createProduct.status"
	>
		<template #headActions>
			<atom-btn
				size="small"
				class="mr-4 font-weight-bold"
				color="yellow-darken-4"
				variant="tonal"
				elevation="1"
				@click="handleReset"
			>
				Reset
			</atom-btn>
		</template>
		<v-row class="card-container">
			<v-col cols="4">
				<atom-card class="pb-4 px-0">
					<template #title>
						<div class="d-flex align-center justify-space-between">
							<h4>Images</h4>
						</div>
					</template>
					<template #subtitle>
						{{ images.value.value?.length || 0 }}/{{ maxFiles }} files
					</template>
					<template #item>
						<v-expand-transition>
							<v-sheet
								v-show="images.errorMessage.value"
								height="18px"
								class="error-message text-12px text-error font-weight-regular"
							>
								{{ images.errorMessage.value }}
							</v-sheet>
						</v-expand-transition>

						<organism-file-panel
							v-model="images.value.value"
							:max-files="maxFiles"
						/>
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
								Clear
							</atom-btn>
						</div>
					</template>
					<v-container class="content-form-container">
						<v-row>
							<v-col cols="7">
								<molecule-input
									v-model="name.value.value"
									:error-messages="name.errorMessage.value"
									input-type="text-field"
									label="Product name"
								/>
							</v-col>
							<v-col cols="5">
								<molecule-input
									v-model="category.value.value"
									:error-messages="category.errorMessage.value"
									input-type="autocomplete"
									label="Category"
									:items="productCategorySelect.data"
									:loading="productCategorySelect.pending"
									auto-select-first
								/>
							</v-col>
							<v-col cols="12">
								<molecule-input
									v-model="description.value.value"
									:error-messages="description.errorMessage.value"
									input-type="textarea"
									label="Product description"
								/>
							</v-col>
							<v-col cols="4">
								<molecule-input
									v-model="originalPrice.value.value"
									:error-messages="originalPrice.errorMessage.value"
									input-type="number-field"
									label="Product price"
									suffix="đ"
									type="number"
									step="1000"
								/>
							</v-col>
							<v-col cols="8">
								<organism-product-option-select
									v-model="options.value.value"
									:error-messages="options.errorMessage.value"
								/>
							</v-col>
						</v-row>
					</v-container>
				</atom-card>
			</v-col>
		</v-row>
		<template #actions>
			<molecule-btn-keep-and-close />
			<molecule-btn-save-dialog
				:loading="createProduct.status === 'pending'"
				@click="submit"
			/>
		</template>
	</molecule-dialog>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { CreateProductModel, createProductSchema } from '~/models'

const show = defineModel<boolean>('show', { default: false, local: true })
const maxFiles = 4

const { handleSubmit, handleReset } = useForm<CreateProductModel>({
	validationSchema: createProductSchema,
})

const name = useField<string>('name')
const images = useField<File[]>('images')
const category = useField<string>('category')
const description = useField<string>('description')
const originalPrice = useField<number>('originalPrice')
const options = useField<string[]>('options')

const productCategorySelect = useProductCategorySelect()
const productOptionSelect = useProductOptionSelect()
const createProduct = useCreateProduct()
const { push } = useAlert()

watch(options.value, () => {
	productOptionSelect.setSelectedValues(options.value.value)
})

const submit = handleSubmit(async values => {
	await createProduct.executePayload(values)
	if (createProduct.success) {
		show.value = false
		await useProductList().refresh()
		push({
			type: 'success',
			text: 'Create product successfully',
			duration: 5000,
		})
	}
})
</script>

<style lang="scss" scoped>
.content-form-container {
	.v-col {
		padding-top: 0;
		padding-bottom: 0;
	}
}
</style>
