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
									v-model="name"
									:error-messages="errorMessage"
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
									suffix="VND"
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
			<atom-btn
				class="text-capitalize font-weight-semibold ml-4 px-3"
				min-width="50"
				variant="tonal"
				elevation="1"
			>
				Keep & close
			</atom-btn>
			<atom-btn
				class="text-capitalize font-weight-bold ml-4"
				min-width="100"
				color="primary"
				variant="elevated"
				flat
				elevation="1"
				:prepend-icon="mdiContentSave"
				:loading="createProduct.pending"
				:disabled="createProduct.pending"
				@click="submit"
			>
				Save
			</atom-btn>
		</template>
	</molecule-dialog>
	<teleport to="body">
		<v-alert
			v-model="alert"
			border="start"
			variant="tonal"
			closable
			close-label="Close Alert"
			color="deep-purple-accent-4"
			title="Closable Alert"
		>
			Aenean imperdiet. Quisque id odio. Cras dapibus. Pellentesque ut neque.
			Cras dapibus. Vivamus consectetuer hendrerit lacus. Sed mollis, eros et
			ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a
			orci. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero,
			non adipiscing dolor urna a orci. Curabitur blandit mollis lacus.
			Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet,
			leo.
		</v-alert>
	</teleport>
</template>

<script setup lang="ts">
import { mdiContentSave } from '@mdi/js'
import { useForm, useField } from 'vee-validate'
import { CreateProductModel, createProductSchema } from '~/models'

const show = defineModel<boolean>('show', { default: false, local: true })
const alert = ref(false)
const maxFiles = 6

const { handleSubmit, handleReset } = useForm<CreateProductModel>({
	validationSchema: createProductSchema,
})

const { value: name, errorMessage } = useField<string>('name')
const images = useField<File[]>('images')
const category = useField<string>('category')
const description = useField<string>('description')
const originalPrice = useField<number>('originalPrice')
const options = useField<string[]>('options')

const productCategorySelect = useProductCategorySelect()
const productOptionSelect = useProductOptionSelect()
const createProduct = useCreateProduct()

watch(options.value, () => {
	productOptionSelect.setSelectedValues(options.value.value)
})

const submit = handleSubmit(async values => {
	await createProduct.executePayload(values)
	if (createProduct.success) {
		alert.value = true
		show.value = false
		useProductList().refresh()
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
