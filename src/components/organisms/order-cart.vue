<template>
	<atom-labeled-sheet
		v-if="order"
		class="pt-10 pb-8"
		label="Giỏ hàng"
	>
		<label>Sản phẩm</label>
		<div
			v-for="(item, index) in order.items"
			:key="index"
			class="py-2 px-3 d-flex align-center justify-space-between"
		>
			<div class="d-flex align-center">
				<atom-img
					class="rounded small-img-shadow mr-4"
					:src="`/product/${item.productId}`"
					main-image
					height="40"
					max-width="40"
					aspect-ratio="1/1"
					server-img
					server-alt-img
					lazy-src="/img/default/product.png"
				/>
				<div class="d-flex justify-center flex-column">
					<div class="d-flex align-center">
						{{ item.quantity }} x&nbsp;
						<v-hover>
							<template #default="{ isHovering, props }">
								<atom-link
									v-bind="props"
									:to="`/product/${order.store.id}`"
									:class="[
										'transition-all',
										isHovering
											? ['text-primary', 'text-decoration-underline']
											: [],
									]"
								>
									{{ item.name }}
								</atom-link>
							</template>
						</v-hover>
						<molecule-order-detail-item-option
							:option-item-keys="item.options"
							class="ml-2"
						/>
						<template v-if="order.review">
							<v-icon
								v-if="order.review.likeItems.includes(item.productId)"
								:icon="mdiThumbUp"
								color="green-darken-2"
								:size="18"
								class="ml-3"
							/>
							<v-icon
								v-if="order.review.dislikeItems.includes(item.productId)"
								:icon="mdiThumbDown"
								color="red-darken-2"
								:size="18"
								class="ml-2"
							/>
						</template>
					</div>
					<p
						v-if="item.note"
						class="text-12px"
					>
						{{ item.note }}
					</p>
				</div>
			</div>
			<div>
				<v-hover>
					<template #default="{ isHovering, props }">
						<span
							v-bind="props"
							:class="[
								'transition-all',
								isHovering ? ['text-disabled'] : [],
								item.unitSalePrice > 0
									? ['text-primary', 'font-weight-medium']
									: [],
							]"
						>
							{{
								((item.unitPrice - item.unitSalePrice) * item.quantity)
									.toLocaleString()
									.replace(/,/, '.')
							}}
							&nbsp;đ
							<v-tooltip
								activator="parent"
								location="left center"
							>
								<div class="d-flex justify-space-between">
									<div class="mr-2">
										<p>Đơn giá:</p>
										<p>Giảm giá:</p>
									</div>
									<div>
										<p class="text-right">
											{{ item.unitPrice.toLocaleString().replace(/,/g, '.') }}
											đ
										</p>
										<p class="text-right">
											{{
												item.unitSalePrice.toLocaleString().replace(/,/g, '.')
											}}
											đ
										</p>
									</div>
								</div>
							</v-tooltip>
						</span>
					</template>
				</v-hover>
			</div>
		</div>
		<label class="mt-12">Giá trị đơn hàng</label>
		<div class="px-4 mt-4">
			<div class="d-flex align-center justify-space-between">
				<div>
					<p>Giá sản phẩm</p>
					<p v-if="order.receiver">Phí giao hàng</p>
					<p
						v-if="order.voucher"
						class="text-primary font-weight-medium"
					>
						<v-hover>
							<template #default="{ isHovering, props }">
								<atom-link
									v-bind="props"
									:to="`/voucher/${order.store.id}`"
									:class="[
										'transition-all',
										isHovering ? ['text-decoration-underline'] : [],
									]"
								>
									{{ order.voucher.title }}
								</atom-link>
							</template>
						</v-hover>
					</p>
				</div>
				<div class="d-flex flex-column align-end">
					<p>
						{{
							(order.totalProductPrice + (order.voucher?.discountPrice || 0))
								.toLocaleString()
								.replace(/,/g, '.')
						}}
						&nbsp;đ
					</p>
					<p v-if="order.receiver">
						{{ order.deliveryPrice.toLocaleString().replace(/,/g, '.') }}
						&nbsp;đ
					</p>
					<p
						v-if="order.voucher"
						class="text-primary font-weight-medium"
					>
						{{
							order.voucher.discountPrice.toLocaleString().replace(/,/g, '.')
						}}
						&nbsp;đ
					</p>
				</div>
			</div>
			<v-divider class="mt-2 mb-1" />
			<div class="d-flex align-center justify-space-between">
				<p class="text-20px font-weight-bold text-grey-darken-3">Tổng cộng</p>
				<div
					class="d-flex align-baseline text-20px font-weight-bold text-grey-darken-3"
				>
					{{
						(
							order.totalProductPrice +
							order.deliveryPrice -
							order.deliveryDiscount
						)
							.toLocaleString()
							.replace(/,/g, '.')
					}}
					&nbsp;đ
				</div>
			</div>
		</div>
		<template v-if="order.review">
			<label class="mt-10">Đánh giá</label>
			<v-rating
				:model-value="rateComputed.rate"
				class="mt-4 mb-2 mr-2 justify-center w-100"
				:item-labels="rateComputed.labels"
				item-label-position="bottom"
				:active-color="rateComputed.color"
				readonly
			>
				<template #item-label="props">
					<span
						class="font-weight-bold text-12px text-center"
						:class="[`text-${rateComputed.color}`]"
					>
						<template
							v-for="word in props.label?.split(' ')"
							:key="word"
						>
							{{ word }}<br />
						</template>
					</span>
				</template>
				<template #item="props">
					<v-icon
						:size="50"
						class="mx-2"
						:color="props.isFilled ? rateComputed.color : 'grey-lighten-1'"
						:icon="props.isFilled ? mdiStar : mdiStarOutline"
					/>
				</template>
			</v-rating>
			<p class="mt-2 mb-4">
				<v-icon
					:icon="mdiPencilOutline"
					size="20"
				/>
				{{ order.review.content }}
			</p>
			<div>
				<v-chip
					size="small"
					class="mr-2 mb-2 px-4 font-weight-bold"
					disabled
				>
					Dịch vụ
				</v-chip>
				<v-chip
					size="small"
					class="mr-2 mb-2 px-4 font-weight-bold"
					disabled
				>
					Sản phẩm
				</v-chip>
				<v-chip
					size="small"
					class="mr-2 mb-2 pl-4 pr-3 font-weight-medium font-weight-bold"
					color="light-green-darken-4"
				>
					<v-icon
						start
						:icon="mdiThumbUp"
						:size="16"
					/>
					Ứng dụng
				</v-chip>
				<v-chip
					size="small"
					class="mr-2 mb-2 pl-4 pr-3 font-weight-medium font-weight-bold"
					color="red-darken-4"
				>
					<v-icon
						start
						:icon="mdiThumbDown"
						:size="16"
					/>
					Không gian
				</v-chip>
			</div>
		</template>
	</atom-labeled-sheet>
</template>

<script setup lang="ts">
import {
	mdiThumbUp,
	mdiThumbDown,
	mdiPencilOutline,
	mdiStar,
	mdiStarOutline,
} from '@mdi/js'

const { data: order } = storeToRefs(useOrderDetail())

const rateColor = [
	'red-darken-3',
	'orange-darken-3',
	'yellow-darken-3',
	'lime-darken-3',
	'green-darken-3',
]
const rateLabel = ['Rất tệ', 'Tệ', 'Bình thường', 'Ngon', 'Rất ngon']
const rateComputed = computed(() => {
	const rate = order.value?.review.rate
	if (rate === null || rate === undefined) return { color: '', label: '' }

	return {
		rate: Math.min(Math.max(rate, 1), 5),
		color: rateColor[rate - 1],
		labels: rateLabel.map((label, index) => {
			if (rate! - 1 !== index) return ''
			return label
		}),
	}
})
</script>

<style scoped></style>
