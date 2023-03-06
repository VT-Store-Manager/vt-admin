<template>
	<template-page-container page-name="Create product">
		<template #title-right>
			<!-- v-show="product.loading"
			:class="{ done: !product.loading }" -->
			<v-progress-circular
				class="mr-4"
				indeterminate
				color="primary"
				:size="24"
				:width="5"
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
				/>
			</v-col>
			<v-col
				cols="12"
				sm="8"
				class="pb-0"
			>
				<base-product-create-content
					ref="productContent"
					class="rounded-12 h-100"
				/>
			</v-col>
		</v-row>
	</template-page-container>
</template>

<script lang="ts" setup>
import { mdiContentSave, mdiRefresh } from '@mdi/js'
import { CreateProductModel } from '~/models/product/create-product'

const productImage = ref<HTMLElement & { imageFiles: File[] }>()
const productContent = ref<
	HTMLElement & { data: Omit<CreateProductModel, 'image'> }
>()

const onSave = () => {
	const createProductData = {
		...productContent.value?.data,
		image: productImage.value?.imageFiles
	} as CreateProductModel
	console.log(createProductData)
}
</script>
