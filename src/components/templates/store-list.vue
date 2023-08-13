<template>
	<organism-data-table
		:headers="headers"
		:items="items"
		:loading="pending"
		:total-item-amount="totalCount"
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
							height="50"
							max-width="75"
							aspect-ratio="1/1"
							:class="{ 'hover-blur': hoveringName }"
							server-img
							cover
							server-alt-img
							placeholder="progress"
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
import moment from 'moment'

import { StoreListItemModel } from '~/models'
import { TableHeader } from '~/types'

const storeList = useStoreList()
const { items, pending, totalCount } = storeToRefs(storeList)
const { updatePage } = storeList

const headers: TableHeader<StoreListItemModel>[] = [
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
		title: 'Last updated',
		key: 'updatedAt',
		sortable: true,
		centerHead: true,
		calculate: (value: number) => moment(new Date(value)).fromNow(),
		default: Date.now(),
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
