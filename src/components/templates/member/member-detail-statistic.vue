<template>
	<atom-labeled-sheet
		v-if="statistic"
		label="Thống kê"
		:icon="mdiChartBox"
		class="pt-10 pb-6 h-100 d-flex flex-column"
	>
		<div>{{ JSON.stringify(statistic, undefined, 2) }}</div>
	</atom-labeled-sheet>
</template>

<script setup lang="ts">
import { mdiChartBox } from '@mdi/js'
import { ShippingMethod } from '#imports'

const { data } = storeToRefs(useMemberDetail())

const statistic = computed(() => {
	if (!data.value) return null
	const sumOrderPriceByType: Record<ShippingMethod, number> = {
		[ShippingMethod.IN_STORE]: 0,
		[ShippingMethod.PICK_UP]: 0,
		[ShippingMethod.DELIVERY]: 0,
		[ShippingMethod.NONE]: 0,
	}
	const countOrderByType: Record<ShippingMethod, number> = {
		[ShippingMethod.IN_STORE]: 0,
		[ShippingMethod.PICK_UP]: 0,
		[ShippingMethod.DELIVERY]: 0,
		[ShippingMethod.NONE]: 0,
	}
	let discountPrice = 0
	let countItems = 0
	let countReviewed = 0
	const countPaymentType = {
		[PaymentType.CAST]: 0,
		[PaymentType.MOMO]: 0,
	}

	const validShippingMethods = Object.values(ShippingMethod).filter(
		v => !isNaN(+v) && +v >= 0
	)
	const validPaymentTypes = Object.values(PaymentType).filter(
		v => !isNaN(+v) && +v >= 0
	)
	data.value.orders.forEach(order => {
		if (validShippingMethods.includes(order.categoryId)) {
			sumOrderPriceByType[order.categoryId] += order.cost
			countOrderByType[order.categoryId]++
		}
		if (order.voucher) {
			discountPrice += order.voucher.discount
		}
		countItems += order.products.reduce(
			(sum, product) => sum + product.amount,
			0
		)
		if (order.review?.rate) {
			countReviewed++
		}
		if (validPaymentTypes.includes(order.payType)) {
			countPaymentType[order.payType]++
		}
	})

	return {
		countOrder: data.value.orders.length,
		countByShippingType: countOrderByType,
		sumByShippingType: sumOrderPriceByType,
		sumDiscount: discountPrice,
		countProduct: countItems,
		countReviewed,
		countByPaymentType: countPaymentType,
	}
})
</script>

<style scoped></style>
