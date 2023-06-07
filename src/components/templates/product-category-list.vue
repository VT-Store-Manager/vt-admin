<template>
	<organism-data-table
		:headers="headers"
		:items="list"
		:items-length="list.length || 0"
		pagination
		:items-per-page="10"
		:total-item-amount="totalProduct"
		:loading="pending"
		editable
		@change-page="updatePage"
	>
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
const { list, totalProduct, pending } = storeToRefs(productCategoryList)
const { updatePage } = productCategoryList

const headers: TableHeader<ProductCategoryItem>[] = [
	{
		title: 'ID',
		key: 'code',
		sortable: true,
	},
	{
		title: 'Name',
		key: 'name',
		sortable: true,
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

useListener('update-page', updatePage)
onBeforeUnmount(() => useOmit('update-page', updatePage))
</script>
