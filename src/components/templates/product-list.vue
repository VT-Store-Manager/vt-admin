<template>
	<organism-data-table
		:headers="headers"
		:items="items"
		:pagination="pagination"
		:total-item-amount="totalProduct"
		:loading="pending"
		editable
		:update-page-fn="updatePage"
	>
		<template #name="{ item }">
			<v-hover>
				<template #default="{ isHovering: hoveringName, props: nameProps }">
					<atom-link
						:to="'/product/' + item.id"
						class="d-flex align-center py-2"
						v-bind="nameProps"
					>
						<atom-img
							class="mr-4 rounded small-img-shadow"
							:src="item.images[0]"
							:alt-src="item.images.slice(1)"
							height="40"
							max-width="40"
							aspect-ratio="1/1"
							:class="{ 'hover-blur': hoveringName }"
							server-img
							server-alt-img
							lazy-src="/img/default/product.png"
						/>
						<span
							class="ellipsis-2 text-16px font-weight-medium transition-color"
							:class="{ 'text-primary': hoveringName }"
						>
							{{ item.name }}
						</span>
					</atom-link>
				</template>
			</v-hover>
		</template>
		<template #category="{ item }">
			<v-hover>
				<template
					#default="{ isHovering: hoveringCategory, props: categoryProps }"
				>
					<atom-link
						:to="'/product-category/' + item.category.id"
						v-bind="categoryProps"
						class="ellipsis-2 text-16px font-weight-medium transition-color d-block py-2"
						:class="{ 'text-primary': hoveringCategory }"
					>
						{{ item.category.name }}
					</atom-link>
				</template>
			</v-hover>
		</template>
		<template #status="{ item }">
			<molecule-status-chip
				:status="item.status"
				class="text-14px font-weight-semibold"
			/>
		</template>
		<template #updatedAt="{ item }">
			<molecule-date-from-now
				:date="item.updatedAt"
				class="text-center text-16px"
			/>
		</template>
	</organism-data-table>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import moment from 'moment'
import { ProductListItem } from '~/composables/apis/use-product-list'
import { TableHeader } from '~/types'

const productList = useProductList()
const { items, totalProduct, pending, pagination } = storeToRefs(productList)
const { updatePage } = productList

const headers: TableHeader<ProductListItem>[] = [
	{
		title: 'Name',
		key: 'name',
		sortable: true,
		width: 280,
	},
	{
		title: 'Category',
		key: 'category',
		sortable: true,
	},
	{
		title: 'Price',
		key: 'originalPrice',
		sortable: true,
		calculate: (value: number) =>
			value.toLocaleString().replace(/,/, '.') + ' đ',
		width: 110,
	},
	{
		title: 'Status',
		key: 'status',
		sortable: true,
	},
	{
		title: 'Last updated',
		key: 'updatedAt',
		sortable: true,
		centerHead: true,
		calculate: (value: number) => moment(new Date(value)).fromNow(),
		default: Date.now(),
	},
]
</script>
