<template>
	<organism-data-table
		:headers="headers"
		:items="items"
		:pagination="pagination"
		:total-item-amount="totalCount"
		:loading="pending"
		:update-page-fn="updatePage"
		editable
	/>
</template>

<script lang="ts" setup>
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
]
</script>
