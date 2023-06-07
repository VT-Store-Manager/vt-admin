<template>
	<v-data-table-server
		v-model:items-per-page="itemsPerPage"
		:headers="headers"
		:items-length="data?.length || 0"
		:items="data || []"
		:loading="pending"
		class="elevation-1"
		item-value="name"
	/>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const productList = useProductList()
const { data, pending } = storeToRefs(productList)

const itemsPerPage = ref(5)
const headers = [
	{ title: 'Name', align: 'start', key: 'name' },
	{ title: 'Price', key: 'originalPrice', align: 'start' },
	{ title: 'Category', key: 'category.name', align: 'start' },
	{ title: 'Last updated', key: 'updatedAt', align: 'start' },
	{ title: 'Status', key: 'status' },
	{ title: 'Sale (1m)', key: 'salesVolume.month' },
]
</script>
