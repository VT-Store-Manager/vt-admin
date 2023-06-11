<template>
	<organism-data-table
		:headers="headers"
		:items="items"
		:loading="pending"
		editable
	>
		<template #detail="{ item }">
			<v-chip
				size="small"
				color="indigo"
				class="font-weight-bold mr-1"
			>
				{{ item.minPoint }}P
			</v-chip>
			<v-chip
				size="small"
				color="teal"
				class="font-weight-bold mr-1"
			>
				x{{ item.coefficientPoint }}
			</v-chip>
			<v-chip
				size="small"
				color="primary"
				class="font-weight-bold mr-1"
			>
				<template #append>
					<v-icon
						class="ml-1"
						icon="fa:fas fa-truck-fast"
						size="x-small"
					/>
				</template>
				{{ item.deliveryFee.toLocaleString().replace(/,/g, '.') }}đ
			</v-chip>
		</template>
	</organism-data-table>
</template>

<script lang="ts" setup>
import moment from 'moment'
import { storeToRefs } from 'pinia'
import { RankItemModel } from '~/composables/apis/use-rank-list'
import { TableHeader } from '~/types'

const rankList = useRankList()
const { items, pending } = storeToRefs(rankList)

const headers: TableHeader<RankItemModel>[] = [
	{
		title: 'Name',
		key: 'name',
		sortable: true,
	},
	{
		title: 'Member',
		key: 'memberNumber',
		sortable: true,
		// centerHead: true,
		alignCol: 'center',
	},
	{
		title: 'Detail',
		key: 'detail',
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
