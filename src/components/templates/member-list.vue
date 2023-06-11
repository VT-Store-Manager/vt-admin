<template>
	<organism-data-table
		:headers="headers"
		:items="items"
		:pagination="pagination"
		:current-page="pagination.page"
		:items-per-page="pagination.limit"
		:total-item-amount="totalCount"
		:loading="pending"
		editable
		@change-page="updatePage"
	/>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { TableHeader } from '~/types'
import { MemberItemModel } from '~/composables/apis/use-member-list'

const memberList = useMemberList()
const { items, totalCount, pending, pagination } = storeToRefs(memberList)
const { updatePage } = memberList

useListener('update-page', updatePage)
onBeforeMount(() => useOmit('update-page', updatePage))

const headers: TableHeader<MemberItemModel>[] = [
	{
		title: 'Code',
		key: 'rank.code',
		sortable: true,
	},
	{
		title: 'Name',
		key: 'name',
		sortable: true,
	},
	// {
	// 	title: 'Phone',
	// 	key: 'phone',
	// 	sortable: true,
	// },
	{
		title: 'Rank',
		key: 'rank.info.rank',
		sortable: true,
	},
	{
		title: 'Point',
		key: 'rank.currentPoint',
		sortable: true,
	},
	{
		title: 'Joined at',
		key: 'createdAt',
		sortable: true,
		calculate: (value: number) => new Date(value).toLocaleString(),
	},
]
</script>
