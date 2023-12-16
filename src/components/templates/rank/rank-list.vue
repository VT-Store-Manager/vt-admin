<template>
	<organism-data-table
		class="rank-table"
		:headers="headers"
		:items="items"
		:loading="pending"
		editable
	>
		<template #name="{ item }">
			<div class="d-flex align-center">
				<v-icon
					:icon="mdiCardBulleted"
					class="mr-2"
					:color="item.appearance.color"
					size="large"
				/>
				<p
					class="font-weight-bold text-16px"
					:style="{ color: darken(0.15, item.appearance.color) }"
				>
					{{ item.name }}
				</p>
			</div>
		</template>
		<template #appearance="{ item }">
			<div class="d-flex align-center justify-center">
				<atom-img
					:src="item.appearance.background"
					height="30"
					width="70"
					server-img
					cover
					class="rounded-lg shadow-cell-img"
					title="Rank background card"
				/>
				<atom-img
					:src="item.appearance.icon"
					server-img
					width="25"
					height="25"
					class="ml-2"
					title="Rank icon"
				/>
			</div>
		</template>
		<template #memberNumber="{ item }">
			<div
				class="d-flex align-center justify-center"
				:style="{ width: '70px' }"
			>
				<p class="text-16px font-weight-semibold text-primary-darken">
					{{ item.memberNumber }}
				</p>
				<v-icon
					icon="fa:fas fa-user"
					size="x-small"
					class="ml-1"
					color="primary-darken"
				/>
			</div>
		</template>
		<template #detail="{ item }">
			<div class="d-flex align-center justify-end">
				<v-chip
					size="small"
					color="indigo"
					class="font-weight-bold mr-1 my-1"
				>
					{{ item.minPoint }}P
				</v-chip>
				<v-chip
					size="small"
					color="teal"
					class="font-weight-bold mr-1 my-1"
				>
					x{{ item.coefficientPoint }}
				</v-chip>
				<v-chip
					size="small"
					color="primary"
					class="font-weight-bold mr-1 my-1"
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
import { darken } from 'polished'
import { mdiCardBulleted } from '@mdi/js'
import { TableHeader } from '~/types'
import { RankListItemModel } from '~/models'

const rankList = useRankList()
const { items, pending } = storeToRefs(rankList)

const headers: TableHeader<RankListItemModel>[] = [
	{
		title: 'Name',
		key: 'name',
		sortable: true,
		width: 200,
	},
	{
		title: 'Appearance',
		key: 'appearance',
		centerHead: true,
	},
	{
		title: 'Member',
		key: 'memberNumber',
		sortable: true,
	},
	{
		title: 'Detail',
		key: 'detail',
		centerHead: true,
	},
	{
		title: 'Last updated',
		key: 'updatedAt',
		sortable: true,
		default: Date.now(),
	},
]
</script>

<style lang="scss" scoped>
.rank-table {
	:deep(td) {
		min-height: 100px;
	}
}
</style>
