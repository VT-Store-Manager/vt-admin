<template>
	<molecule-list-page-container page-name="Order history">
		<template #subtitle>
			<p>{{ totalCount || '--' }} order{{ totalCount > 1 ? 's' : '' }}</p>
		</template>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Refresh data"
				@click="refresh"
			/>
			<molecule-btn-create> New </molecule-btn-create>
		</template>
		<template-order-history-list />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useOrderHistory } from '../../composables/apis/use-order-history'

const orderHistory = useOrderHistory()
const { totalCount } = storeToRefs(orderHistory)
const { refresh, pushQuery } = orderHistory
pushQuery()
</script>
