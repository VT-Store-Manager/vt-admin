<template>
	<organism-data-table
		:headers="headers"
		:items="hideChild ? parentOptions : items"
		:pagination="pagination"
		:total-item-amount="totalCount"
		:loading="pending"
		editable
		:update-page-fn="updatePage"
	>
		<template #name="{ item }">
			<div class="d-flex align-center">
				<p class="text-16px">{{ item.name }}</p>
				<v-chip
					v-if="item.parent"
					density="comfortable"
					class="ml-2"
					size="small"
				>
					sub-option
				</v-chip>
			</div>
		</template>
		<template #subOption="{ item }">
			{{ subOptionMap.get(item.id)?.length || 0 }} subs
		</template>
		<template #items="{ item: option }">
			<div class="d-flex">
				<p class="text-16px">
					{{ option.items.length }} items
					<v-tooltip activator="parent">
						<div class="d-flex">
							<div class="item-name">
								<p
									v-for="item in option.items"
									:key="item.key"
								>
									{{ item.name }}
								</p>
							</div>
							<div class="item-cost ml-4">
								<p
									v-for="item in option.items"
									:key="item.key"
									class="text-right"
								>
									{{ item.cost }} đ
								</p>
							</div>
						</div>
					</v-tooltip>
				</p>
			</div>
		</template>
		<template #status="{ item }">
			<molecule-status-chip
				:status="item.status"
				class="text-14px font-weight-semibold"
			/>
		</template>
	</organism-data-table>
</template>

<script lang="ts" setup>

import { TableHeader } from '~/types'
import { ProductOptionListItemModel } from '~/models'
import { useProductOptionList } from '~/composables/apis/use-product-option-list'

interface Props {
	hideChild: boolean
}

const props = defineProps<Props>()
const productOptionList = useProductOptionList()
const { items, totalCount, pending, pagination, parentOptions, subOptionMap } =
	storeToRefs(productOptionList)
const { updatePage } = productOptionList

const headers = computed<TableHeader<ProductOptionListItemModel>[]>(() => [
	{
		title: 'Name',
		key: 'name',
		sortable: true,
	},
	...(props.hideChild
		? [
				{
					title: 'Sub-options',
					key: 'subOption',
				},
		  ]
		: []),
	{
		title: 'Items',
		key: 'items',
	},
	{
		title: 'Applying',
		key: 'applying',
		calculate: value => `${value} product${value > 1 ? 's' : ''}`,
	},
	{
		title: 'Status',
		key: 'status',
		sortable: true,
	},
])
</script>
