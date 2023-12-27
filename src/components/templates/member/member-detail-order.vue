<template>
	<atom-labeled-sheet
		label="Lịch sử đơn hàng"
		class="pt-0"
		:icon="mdiHistory"
	>
		<organism-data-table
			:headers="headers"
			:items="(memberData?.orders ?? []).slice(0, displayAmount)"
			:total-item-amount="memberData?.orders.length || 0"
			:loading="status === 'pending'"
			class="mx-n6"
			:wrapper-props="{ class: 'pt-12' }"
		>
			<template #code="{ item }">
				<div class="my-2">
					<p class="text-16px font-weight-semibold">
						<v-hover v-slot="{ props, isHovering }">
							<atom-link
								v-bind="props"
								:to="`order/${item.code}`"
								:class="[isHovering ? ['text-primary', 'cursor-pointer'] : []]"
							>
								{{ item.code }}
							</atom-link>
						</v-hover>
					</p>
					<p>
						<span>
							{{ item.name }}
							<v-tooltip
								open-delay="300"
								activator="parent"
								location="end center"
							>
								<div class="d-flex">
									<div class="product-name mr-4">
										<p
											v-for="(product, index) in item.products"
											:key="index"
										>
											{{ product.amount }} x {{ product.name }}
										</p>
									</div>
									<div class="product-price">
										<p
											v-for="(product, index) in item.products"
											:key="index"
											class="text-right"
										>
											{{ product.cost.toLocaleString().replace(/,/g, '.') }} đ
										</p>
									</div>
								</div>
							</v-tooltip>
						</span>
					</p>
				</div>
			</template>
			<template #store="{ item }">
				<v-hover v-slot="{ props, isHovering }">
					<atom-link
						v-bind="props"
						:to="`/store/${item.store.id}`"
						:class="{
							'text-primary': isHovering,
						}"
					>
						{{ item.store.name }}
					</atom-link>
				</v-hover>
			</template>
			<template #price="{ item }">
				<div class="d-flex">
					<p>
						{{ (item.cost + item.fee).toLocaleString().replace(/,/g, '.') }} đ
						<v-tooltip
							open-delay="300"
							activator="parent"
							location="top left"
						>
							<div class="d-flex">
								<div class="price-text mr-4">
									<p>Items price:</p>
									<p>Shipping price:</p>
									<p>Total price:</p>
								</div>
								<div
									v-if="item.voucher?.discount || item.fee !== item.originalFee"
									class="price-original-price mr-1"
								>
									<p
										v-if="item.voucher?.discount"
										class="text-decoration-line-through text-right"
									>
										{{
											(item.cost - item.fee + item.voucher.discount)
												.toLocaleString()
												.replace(/,/g, '.')
										}}
									</p>
									<p
										v-if="item.fee !== item.originalFee"
										class="text-decoration-line-through text-right"
									>
										{{ item.originalFee.toLocaleString().replace(/,/g, '.') }}
									</p>
								</div>
								<div class="price-price">
									<p class="text-right">
										{{
											(item.cost - item.fee).toLocaleString().replace(/,/g, '.')
										}}
										đ
									</p>
									<p class="text-right">
										{{ item.fee.toLocaleString().replace(/,/g, '.') }}
										đ
									</p>
									<p class="text-right">
										{{ item.cost.toLocaleString().replace(/,/g, '.') }} đ
									</p>
								</div>
							</div>
						</v-tooltip>
					</p>
				</div>
			</template>
			<template #status="{ item }">
				<molecule-order-status-chip :status="item.status" />
			</template>
			<template #time="{ item }">
				<atom-date-cell
					:date="item.time"
					font-size="16"
				/>
			</template>
		</organism-data-table>

		<v-btn @click="onShowMore">Show more</v-btn>
	</atom-labeled-sheet>
</template>

<script setup lang="ts">
import { mdiHistory } from '@mdi/js'
import { TableHeader } from '~/types'
import { OrderHistoryItem } from '~/models'

const { data: memberData, status } = useMemberDetail()
const displayAmount = ref(5)
const pagination = 10

const headers = computed<TableHeader<OrderHistoryItem>[]>(() => {
	return [
		{
			title: 'Code',
			key: 'code',
			width: 250,
		},
		{
			title: 'Store',
			key: 'store',
		},
		{
			title: 'Price',
			key: 'price',
		},
		{
			title: 'Status',
			key: 'status',
		},
		{
			title: 'Time',
			key: 'time',
			sortable: true,
		},
	]
})

const onShowMore = () => {
	displayAmount.value = Math.max(
		pagination * Math.floor(displayAmount.value / pagination + 1),
		0
	)
}
</script>
