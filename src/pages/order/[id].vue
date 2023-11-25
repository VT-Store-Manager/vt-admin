<template>
	<molecule-list-page-container
		page-name="Chi tiết đơn hàng"
		scroll
		no-divider
	>
		<template
			v-if="orderData"
			#subtitle
		>
			<v-chip
				color="blue-grey-darken-3"
				size="x-small"
				variant="tonal"
				class="font-weight-bold"
			>
				<template #append>
					<atom-copy-icon :content="orderData.code" />
				</template>
				{{ orderData.code }}
			</v-chip>
			<v-chip
				size="x-small"
				variant="tonal"
				:color="orderTypeColor"
				class="font-weight-bold ml-2"
			>
				{{ orderTypeName }}
			</v-chip>
			<v-chip
				size="x-small"
				variant="tonal"
				:color="paymentColor"
				class="font-weight-bold ml-2"
			>
				{{ paymentName }}
			</v-chip>
		</template>
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
import {
	shippingMethodName,
	ShippingMethod,
	paymentMethodName,
	PaymentType,
} from '~/constants'

const route = useRoute()
const orderId = route.params.id as string

const orderDetail = useOrderDetail()
const { data: orderData } = storeToRefs(orderDetail)
orderDetail.fetch(orderId)

const orderTypeName = computed(() => {
	if (!orderData.value) return ''
	return shippingMethodName[orderData.value.type as ShippingMethod]
})

const orderTypeColor = computed(() => {
	if (!orderData.value) return undefined
	switch (orderData.value.type) {
		case ShippingMethod.IN_STORE:
			return 'brown-darken-1'
		case ShippingMethod.PICK_UP:
			return 'deep-orange-darken-4'
		case ShippingMethod.DELIVERY:
			return 'indigo-darken-4'
		default:
			return undefined
	}
})

const paymentName = computed(() => {
	if (!orderData.value) return ''
	return paymentMethodName[orderData.value.payment as PaymentType]
})

const paymentColor = computed(() => {
	if (!orderData.value) return undefined
	switch (orderData.value.payment) {
		case PaymentType.CAST:
			return 'teal-darken-2'
		case PaymentType.MOMO:
			return 'pink-darken-4'
		default:
			return undefined
	}
})
</script>

<style lang="scss" scoped></style>
