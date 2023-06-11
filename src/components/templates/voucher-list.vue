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
	</organism-data-table>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import moment from 'moment'
import { TableHeader } from '~/types/index'
import { VoucherListItem } from '~/composables/apis/use-voucher-list'

const voucherList = useVoucherList()
const { items, totalCount, pending, pagination } = storeToRefs(voucherList)
const { updatePage } = voucherList

const headers: TableHeader<VoucherListItem>[] = [
	{
		title: 'Name',
		key: 'name',
		width: 400,
	},
	{
		title: 'Partner',
		key: 'partner.code',
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
