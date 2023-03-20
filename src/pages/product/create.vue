<template>
	<template-page-container page-name="Create product">
		<template #title-right>
			<base-progress-circular
				v-show="createProduct.loading"
				:class="{ done: !createProduct.loading }"
			/>
			<v-hover>
				<template #default="{ isHovering, props }">
					<button-secondary
						v-bind="props"
						class="mr-4"
						:class="{ 'bg-red-darken-4': isHovering }"
						text="Reset"
						:icon="mdiRefresh"
					/>
				</template>
			</v-hover>
			<button-primary
				text="Save"
				:icon="mdiContentSave"
				@click="onSave"
			/>
		</template>
		<v-row class="h-100">
			<v-col
				cols="12"
				sm="4"
				class="pb-0"
			>
				<base-panel-new-image
					ref="productImage"
					class="rounded-12 h-100"
					:max-images="6"
					:error-flag="isError.image"
				/>
			</v-col>
			<v-col
				cols="12"
				sm="8"
				class="pb-0"
			>
				<product-create-content
					ref="productContent"
					class="rounded-12 h-100"
					:name-error="isError.name"
					:category-error="isError.category"
					:price-error="isError.price"
				/>
			</v-col>
		</v-row>
	</template-page-container>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import { mdiContentSave, mdiRefresh } from '@mdi/js'
import { serialize } from 'object-to-formdata'
import { CreateProductModel } from '~/models/product/create-product'
import { useCreateProduct } from '~/composables/apis/use-create-product'

type CreateWithoutImageModel = Omit<CreateProductModel, 'images'>

const productImage = ref<HTMLElement & { images: File[] }>()
const productContent = ref<HTMLElement & { data: CreateWithoutImageModel }>()
const isError = reactive({
	image: false,
	name: false,
	category: false,
	price: false
})
const createProduct = useCreateProduct()

const onSave = () => {
	const productDtoData: CreateProductModel = {
		images:
			productImage.value?.images && !_.isEmpty(productImage.value?.images)
				? productImage.value.images
				: [],
		name: productContent.value?.data.name || '',
		category: productContent.value?.data.category || '',
		description: productContent.value?.data.description || '',
		originalPrice: productContent.value?.data.originalPrice || 0,
		options: productContent.value?.data.options || []
	}
	if (
		productDtoData.images.length === 0 ||
		!productDtoData.name ||
		!productDtoData.category ||
		productDtoData.originalPrice < 0
	) {
		isError.image = productDtoData.images.length === 0
		isError.name = !productDtoData.name
		isError.category = !productDtoData.category
		isError.price = productDtoData.originalPrice < 0
		return
	}
	const body = serialize(productDtoData, { noFilesWithArrayNotation: true })
	createProduct.fetch({ body })
}

watch(isError, () => {
	isError.image &&
		setTimeout(() => {
			isError.image = false
		}, 3000)
	isError.name &&
		setTimeout(() => {
			isError.name = false
		}, 3000)
	isError.category &&
		setTimeout(() => {
			isError.category = false
		}, 3000)
	isError.price &&
		setTimeout(() => {
			isError.price = false
		}, 3000)
})
</script>
