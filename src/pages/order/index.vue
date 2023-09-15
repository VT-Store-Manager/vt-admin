<template>
	<molecule-list-page-container
		page-name="Order history"
		scroll
	>
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
const orderHistory = useOrderHistory()
const { totalCount } = storeToRefs(orderHistory)
const { refresh, pushQuery } = orderHistory
pushQuery()
</script>
