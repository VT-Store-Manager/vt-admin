<template>
	<organism-data-table
		:headers="headers"
		:items="items"
		:loading="pending"
		:total-item-amount="totalCount"
		editable
		:update-page-fn="updatePage"
	>
		<template #status="{ item }">
			<v-chip
				size="small"
				variant="elevated"
				:color="getStatusColor(item.disabled, item.deleted)"
			>
				{{ getStatusText(item.disabled, item.deleted) }}
			</v-chip>
		</template>
	</organism-data-table>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { StoreItemModel } from '~/composables/apis/use-store-list'
import { TableHeader } from '~/types'

const storeList = useStoreList()
const { items, pending, totalCount } = storeToRefs(storeList)
const { updatePage } = storeList

const headers: TableHeader<StoreItemModel>[] = [
	{
		title: 'Name',
		key: 'name',
		sortable: true,
	},
	{
		title: 'Status',
		key: 'status',
	},
	{
		title: 'Last update',
		key: 'updatedAt',
		sortable: true,
	},
]

const getStatusColor = (disabled: boolean, deleted: boolean) => {
	if (deleted) return 'grey'
	else if (disabled) return 'danger'
	else return 'success'
}
const getStatusText = (disabled: boolean, deleted: boolean) => {
	if (deleted) return 'removed'
	else if (disabled) return 'disabled'
	else return 'active'
}
</script>
