<template>
	<molecule-list-page-container
		page-name="Chi tiết đơn hàng"
		scroll
	>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Tải lại"
				@click="orderDetail.refresh"
			/>
		</template>
		<template-order-detail />
	</molecule-list-page-container>
</template>

<script setup lang="ts">
const route = useRoute()
const orderId = route.params.id as string

const orderDetail = useOrderDetail()
orderDetail.fetch(orderId)
</script>

<style lang="scss" scoped></style>
