<template>
	<organism-data-table
		:headers="headers"
		:items="items"
		:pagination="pagination"
		:total-item-amount="totalCount"
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
							:max-width="40"
							cover
							:class="{ 'hover-blur': hoveringName }"
							server-img
							:style="{ width: '40px' }"
							placeholder="progress"
						/>
						<div class="d-flex flex-column justify-center py-1">
							<span
								class="ellipsis-2"
								:class="{ 'text-primary-darken': hoveringName }"
							>
								{{ item.name }}
							</span>
							<span class="text-12px font-weight-bold">{{ item.code }}</span>
						</div>
					</atom-link>
				</template>
			</v-hover>
		</template>
		<template #partner="{ item }">
			<atom-link
				v-if="item.partner"
				:to="`/partner/${item.partner.id}`"
				class="d-flex align-center justify-center cursor-pointer"
			>
				<atom-img
					:src="item.partner.image"
					server-img
					max-width="35"
					aspect-ratio="1/1"
					cover
					placeholder="progress"
					class="rounded shadow-cell-img mr-2"
				/>
				<v-tooltip
					activator="parent"
					location="top"
					:open-delay="500"
					:text="item.partner.name"
				/>
			</atom-link>
			<div
				v-else
				class="d-flex align-center justify-center"
			>
				<atom-img
					src="/img/logo/original.png"
					max-width="35"
					aspect-ratio="1/1"
					cover
					placeholder="progress"
					class="rounded shadow-cell-img mr-2"
				/>
				<v-tooltip
					activator="parent"
					location="top"
					:open-delay="500"
					text="The Coffee House"
				/>
			</div>
		</template>
		<template #status="{ item }">
			<div class="d-flex align-center justify-center">
				<molecule-status-chip
					:status="item.status"
					class="text-14px font-weight-semibold"
				/>
			</div>
		</template>
		<template #publishStatus="{ item }">
			<div class="d-flex align-center justify-center">
				<molecule-publish-chip
					v-bind="pick(item, ['startTime', 'finishTime'])"
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
import pick from 'lodash/pick'
import { storeToRefs } from 'pinia'
import { VoucherListItemModel } from '~/models'
import { TableHeader } from '~/types'

const voucherList = useVoucherList()
const { items, totalCount, pending, pagination } = storeToRefs(voucherList)
const { updatePage } = voucherList

const headers: TableHeader<VoucherListItemModel>[] = [
	{
		title: 'Name',
		key: 'name',
	},
	{
		title: 'Partner',
		key: 'partner',
		centerHead: true,
	},
	{
		title: 'Status',
		key: 'status',
		sortable: true,
		centerHead: true,
		alignCol: 'center',
	},
	{
		title: 'Publish',
		key: 'publishStatus',
		sortable: true,
		centerHead: true,
		alignCol: 'center',
	},
]
</script>
