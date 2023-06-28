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
							class="mr-4 rounded-circle small-img-shadow"
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
		<template #amountOfProduct="{ item }">
			<div
				class="d-flex align-center justify-center"
				:style="{ width: '70px' }"
			>
				<p class="text-16px font-weight-semibold text-primary-darken">
					{{ item.amountOfProduct }}
				</p>
				<v-icon
					:icon="mdiCoffee"
					size="small"
					class="ml-1"
					color="primary-darken"
				/>
			</div>
		</template>
		<template #featured="{ item }">
			<p class="text-center">
				<molecule-icon-check :value="item.featured" />
			</p>
		</template>
		<template #status="{ item }">
			<div class="text-center">
				<molecule-status-chip
					:status="item.status"
					class="text-14px font-weight-semibold"
				/>
			</div>
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
import { mdiCoffee } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { ProductCategoryListItemModel } from '~/models'
import { TableHeader } from '~/types'

const productCategoryList = useProductCategoryList()
const { items, totalProduct, pending, pagination } =
	storeToRefs(productCategoryList)
const { updatePage } = productCategoryList

const headers: TableHeader<ProductCategoryListItemModel>[] = [
	{
		title: 'Name',
		key: 'name',
		sortable: true,
		width: 250,
	},
	{
		title: 'Amount',
		key: 'amountOfProduct',
		sortable: true,
		alignCol: 'center',
		centerHead: true,
	},
	// TODO: Enable statistic weekly
	// {
	// 	title: 'Sold (week)',
	// 	key: 'soldOfWeek',
	// 	sortable: true,
	// 	alignCol: 'center',
	// 	centerHead: true,
	// 	calculate: () => Math.floor(Math.random() * 10000),
	// },
	{
		title: 'Featured',
		key: 'featured',
		sortable: true,
		alignCol: 'center',
		centerHead: true,
	},
	{
		title: 'Status',
		key: 'status',
		sortable: true,
		centerHead: true,
	},
	{
		title: 'Last update',
		key: 'updatedAt',
		sortable: true,
		default: Date.now(),
		centerHead: true,
	},
]
</script>
