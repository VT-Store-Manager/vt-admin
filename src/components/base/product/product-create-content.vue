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
							:error="productCategory.error"
							:items="productCategory.categorySelect"
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
						<base-product-option-expansion-panel :option-ids="data.options" />
					</v-col>
				</v-row>
			</v-container>
		</v-card-item>
	</v-card>
</template>

<script lang="ts" setup>
import { CreateProductModel } from '~/models/product/create-product'

const productCategory = useProductCategory()
const productOptionList = useProductOptionList()

Promise.all([productCategory.fetch(), productOptionList.fetch()])

const data = reactive<
	Omit<CreateProductModel, 'category'> & { category?: string }
>({
	name: '',
	originalPrice: 0,
	category: undefined,
	description: '',
	options: []
})

defineExpose({ data })
</script>
