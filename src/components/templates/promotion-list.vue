<template>
	<organism-data-table
		:headers="headers"
		:items="items"
		:pagination="pagination"
		:total-item-amount="totalCount"
		:loading="pending"
		:update-page-fn="updatePage"
		editable
	>
		<template #cost="{ item }">
			<p>
				{{ item.cost }}
				<span>BEAN</span>
			</p>
		</template>
		<template #isFeatured="{ item }">
			<p class="text-center">
				<molecule-icon-check :value="item.isFeatured" />
			</p>
		</template>
		<template #status="{ item }">
			<div class="text-center">
				<molecule-status-chip
					:raw="pick(item, ['disabled', 'deleted'])"
					class="text-14px font-weight-semibold"
				/>
			</div>
		</template>
		<template #publish="{ item }">
			<molecule-publish-chip
				v-bind="pick(item, ['startTime', 'finishTime'])"
				class="text-14px font-weight-semibold"
			/>
		</template>
	</organism-data-table>
</template>

<script lang="ts" setup>
import pick from 'lodash/pick'
import { storeToRefs } from 'pinia'
import { PromotionItemModel } from '~/composables/apis/use-promotion-list'
import { TableHeader } from '~/types'

const promotionList = usePromotionList()
const { items, totalCount, pending, pagination } = storeToRefs(promotionList)
const { updatePage } = promotionList

const headers: TableHeader<PromotionItemModel>[] = [
	{
		title: 'Name',
		key: 'name',
		sortable: true,
		calculate: (value, item) => value || item.voucher.title,
	},
	{
		title: 'Cost',
		key: 'cost',
		sortable: true,
	},
	{
		title: 'Featured',
		key: 'isFeatured',
		sortable: true,
		alignCol: 'center',
		centerHead: true,
	},
	{
		title: 'Status',
		key: 'status',
		sortable: true,
		alignCol: 'center',
		centerHead: true,
	},
	{
		title: 'Publish',
		key: 'publish',
		sortable: true,
	},
]
</script>
