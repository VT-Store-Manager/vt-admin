<template>
	<v-card class="product-create-content">
		<v-card-title>
			<p>Content</p>
		</v-card-title>
		<v-card-item>
			<v-container>
				<v-row>
					<v-col
						cols="6"
						class="pb-0"
					>
						<base-form-input
							v-model="data.name"
							label="Product name"
							:rules="rules.name"
							:error="nameError"
						/>
					</v-col>
					<v-col
						cols="6"
						class="pb-0"
					>
						<base-form-select
							v-model="data.category"
							label="Category"
							:loading="productCategory.loading"
							:error="productCategory.error || categoryError"
							:items="productCategory.categorySelect"
							:rules="rules.category"
						/>
					</v-col>
					<v-col cols="12">
						<base-form-textarea
							v-model="data.description"
							label="Description"
						/>
					</v-col>
					<v-col cols="4">
						<base-form-input
							v-model="data.originalPrice"
							label="Original price"
							type="number"
							:rules="rules.originalPrice"
							:error="priceError"
						/>
					</v-col>
					<v-col cols="8">
						<base-form-select
							v-model="data.options"
							label="Options"
							:loading="productOptionList.loading"
							:error="productOptionList.error"
							:items="productOptionList.getAllNameForSelect"
							multiple
							chips
							clearable
							closable-chips
						/>
					</v-col>
					<v-col cols="12">
						<product-option-expansion-panel :option-ids="data.options" />
					</v-col>
				</v-row>
			</v-container>
		</v-card-item>
	</v-card>
</template>

<script lang="ts" setup>
import { CreateProductModel } from '~/models/product/create-product'

interface Props {
	nameError?: boolean
	categoryError?: boolean
	priceError?: boolean
}

withDefaults(defineProps<Props>(), {
	nameError: false,
	categoryError: false,
	priceError: false
})
const productCategory = useProductCategory()
const productOptionList = useProductOptionList()

Promise.all([productCategory.fetch(), productOptionList.fetch()])

const data = reactive<
	Omit<CreateProductModel, 'category' | 'images'> & { category?: string }
>({
	name: '',
	originalPrice: 0,
	category: undefined,
	description: '',
	options: []
})

const rules = {
	name: [(value: string) => !!value || 'Required'],
	originalPrice: [
		(value: string | number) => +value >= 0 || 'Must be greater than 0'
	],
	category: [(value: string) => !!value || 'Required']
}

defineExpose({ data })
</script>
