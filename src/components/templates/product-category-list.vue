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
						:to="'/product-category/' + item.id"
						class="d-flex align-center"
						v-bind="nameProps"
					>
						<atom-img
							class="mr-4 rounded small-img-shadow"
							:src="item.image"
							height="40"
							max-width="40"
							aspect-ratio="1/1"
							:class="{ 'hover-blur': hoveringName }"
							server-img
							lazy-src="/img/default/product-category.png"
						/>
						<span
							class="ellipsis-2"
							:class="{ 'text-primary-darken': hoveringName }"
						>
							{{ item.name }}
						</span>
					</atom-link>
				</template>
			</v-hover>
		</template>
		<template #status="{ item }">
			<v-chip
				size="small"
				variant="elevated"
				:color="
					item.status === Status.ACTIVE
						? 'green-lighten-1'
						: item.status === Status.DISABLED
						? 'purple-lighten-3'
						: 'red-lighten-2'
				"
			>
				{{ item.status }}
			</v-chip>
		</template>
	</organism-data-table>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import moment from 'moment'
import { ProductCategoryItem } from '~/composables/apis/use-product-category-list'
import { TableHeader } from '~/types'
import { Status } from '~/constants'

const productCategoryList = useProductCategoryList()
const { items, totalProduct, pending, pagination } =
	storeToRefs(productCategoryList)
const { updatePage } = productCategoryList

const headers: TableHeader<ProductCategoryItem>[] = [
	{
		title: 'Name',
		key: 'name',
		sortable: true,
		width: 300,
	},
	{
		title: 'Amount',
		key: 'amountOfProduct',
		sortable: true,
	},
	{
		title: 'Sold (week)',
		key: 'soldOfWeek',
		sortable: true,
	},
	{
		title: 'Status',
		key: 'status',
		sortable: true,
	},
	{
		title: 'Last update',
		key: 'updatedAt',
		sortable: true,
		calculate: (value: number) => moment(new Date(value)).fromNow(),
		default: Date.now(),
	},
]
</script>
