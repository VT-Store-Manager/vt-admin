<template>
	<molecule-dialog
		v-model="show"
		:card-attrs="{}"
		:sheet-attrs="{
			width: '95%',
			maxWidth: '600px',
		}"
		title="New product category"
		persistent
		:error-message="createProductCategory.error?.data?.message"
		:status="createProductCategory.status"
	>
		<template #headActions>
			<molecule-btn-reset @click="handleReset" />
		</template>
		<template #default>
			<molecule-input
				v-model="name.value.value"
				:error-messages="name.errorMessage.value"
				input-type="text-field"
				label="Category name"
			/>
			<organism-file-panel
				v-model="image.value.value"
				:max-files="1"
				:error="!!image.errorMessage.value"
			/>
			<v-expand-transition>
				<v-sheet
					v-show="image.errorMessage.value"
					height="18px"
					class="error-message text-12px text-error font-weight-regular mt-1 ml-4"
				>
					{{ image.errorMessage.value }}
				</v-sheet>
			</v-expand-transition>
		</template>
		<template #actions>
			<molecule-btn-keep-and-close @click="show = false" />
			<molecule-btn-save-dialog
				:loading="createProductCategory.status === 'pending'"
				@click="submit"
			/>
		</template>
	</molecule-dialog>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import {
	CreateProductCategoryModel,
	createProductCategorySchema,
} from '~/models/create-product-category-model'

const show = defineModel<boolean>('show', { default: false, local: true })
const createProductCategory = useCreateProductCategory()

const { handleSubmit, handleReset } = useForm<CreateProductCategoryModel>({
	validationSchema: createProductCategorySchema,
})

const name = useField<string>('name')
const image = useField<File[]>('image')

const { push } = useAlert()

const submit = handleSubmit(async values => {
	values.image = (values.image as File[])[0]
	await createProductCategory.executePayload(values)
	if (createProductCategory.success) {
		show.value = false
		handleReset()
		await useProductCategoryList().refresh()
		push({
			type: 'success',
			text: 'Create product category successfully',
			duration: 5000,
		})
	}
})

watch(image.value, () => {
	console.log(image.value.value)
})
</script>

<style scoped lang="scss"></style>
