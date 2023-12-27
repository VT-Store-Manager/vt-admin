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
		<template #member="{ item }">
			<div class="d-flex">
				<p
					v-if="!item.member"
					class="text-grey"
				>
					CUSTOMER
				</p>
				<p v-else>
					<v-hover v-slot="{ props, isHovering }">
						<atom-link
							v-bind="props"
							:to="`/member/${item.member.id}`"
							:class="[{ 'text-primary': isHovering }, 'text-16px']"
						>
							{{ item.member.name }}
							<v-tooltip
								v-if="item?.member?.rankName"
								open-delay="300"
								activator="parent"
								location="top left"
							>
								Thành viên {{ item?.member?.rankName }}
							</v-tooltip>
						</atom-link>
					</v-hover>
				</p>
			</div>
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
</template>

<script lang="ts" setup>
import { TableHeader } from '~/types'
import { OrderHistoryItem } from '~/models'

const orderHistory = useOrderHistory()
const { items, totalCount, pending, pagination } = storeToRefs(orderHistory)
const { updatePage } = orderHistory

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
			title: 'Member',
			key: 'member',
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
</script>
