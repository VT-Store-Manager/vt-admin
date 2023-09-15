<template>
	<div class="order-detail-container mb-10">
		<v-row v-if="order">
			<v-col cols="4">
				<label>Code</label>
				<p>{{ order.code }}</p>
			</v-col>
			<v-col cols="4">
				<label>Loại đơn hàng</label>
				<p>{{ orderTypeName }}</p>
			</v-col>
			<v-col cols="4">
				<label>Ngày tạo</label>
				<p>
					{{ moment(new Date(order.createdAt)).format('YYYY-MM-DD HH:mm:ss') }}
				</p>
			</v-col>
			<v-col cols="8">
				<label>Cửa hàng</label>
				<div class="d-flex">
					<v-sheet
						class="px-4 py-2 bg-grey-lighten-5"
						rounded="lg"
					>
						<p class="text-14px">
							<span class="font-weight-semibold">Tên: </span>
							<v-hover>
								<template #default="{ isHovering, props }">
									<atom-link
										v-bind="props"
										:to="`/store/${order.store.id}`"
										:class="[
											'transition-all',
											isHovering
												? ['text-primary', 'text-decoration-underline']
												: [],
										]"
									>
										{{ order.store.name }}
									</atom-link>
								</template>
							</v-hover>
						</p>
						<p class="text-14px">
							<span class="font-weight-semibold">Địa chỉ:</span>
							{{ order.store.address }}
						</p>
					</v-sheet>
				</div>
			</v-col>
			<v-col
				v-if="order.member"
				cols="4"
			>
				<label>Người mua</label>
				<div class="d-flex align-center">
					<p
						class="text-white font-weight-bold d-inline-block rounded-pill py-1 px-2 mr-2 text-12px"
						:style="{ background: order.member.rankColor }"
					>
						{{ order.member.rankName }}
					</p>
					<p class="font-weight-medium">
						<v-hover>
							<template #default="{ isHovering, props }">
								<atom-link
									:to="`/member/${order.member.id}`"
									v-bind="props"
									:class="[
										'transition-all',
										isHovering
											? ['text-primary', 'text-decoration-underline']
											: [],
									]"
								>
									{{ order.member.name }}
								</atom-link>
							</template>
						</v-hover>
					</p>
				</div>
			</v-col>
			<v-col
				v-if="order.receiver"
				cols="8"
			>
				<label>Người nhận</label>
				<div class="d-flex">
					<v-sheet
						class="px-4 py-2 bg-grey-lighten-5"
						rounded="lg"
					>
						<p class="text-14px">
							<span class="font-weight-semibold">Tên:</span>
							{{ order.receiver.name }}
						</p>
						<p class="text-14px">
							<span class="font-weight-semibold">Số điện thoại:</span>

							{{ order.receiver.phone.replace(/^\+?84/, '(+84) ') }}
						</p>
						<p class="text-14px">
							<span class="font-weight-semibold">Địa chỉ:</span>
							{{ order.receiver.address }}
						</p>
						<p class="text-14px">
							<span class="font-weight-semibold"> Thời gian:</span>
							{{ moment(order.receiver.timer).format('YYYY-MM-DD HH:mm:ss') }}
						</p>
					</v-sheet>
				</div>
			</v-col>
			<v-col
				v-if="order.receiver"
				cols="4"
			>
				<label>Khoảng cách:</label>
				<p>{{ (Math.random() * 10).toFixed(1) }} km</p>
			</v-col>
			<v-col cols="12">
				<label>Trạng thái</label>
				<v-timeline
					direction="horizontal"
					class="mt-2"
				>
					<v-timeline-item
						dot-color="green-darken-1"
						size="small"
						:icon="mdiCheck"
					>
						<p class="text-14px">Đã xác nhận</p>
						<template #opposite>
							<p class="text-14px">
								{{ moment(order.createdAt).format('HH:mm') }}
							</p>
						</template>
					</v-timeline-item>
					<v-timeline-item
						dot-color="orange-darken-1"
						size="small"
					>
						<template #icon>
							<v-progress-circular
								indeterminate
								:size="16"
								:width="2"
								color="grey-lighten-3"
							/>
						</template>
						<p class="text-14px">Đang thực hiện</p>
					</v-timeline-item>
					<v-timeline-item
						dot-color="grey-lighten-1"
						size="small"
						class="text-grey-lighten-1"
					>
						<p class="text-14px">Giao hàng</p>
					</v-timeline-item>
					<v-timeline-item
						dot-color="grey-lighten-1"
						size="small"
						class="text-grey-lighten-1"
					>
						<p class="text-14px">Hoàn thành</p>
					</v-timeline-item>
					<v-timeline-item
						dot-color="grey-lighten-1"
						size="small"
						class="text-grey-lighten-1"
					>
						<p class="text-14px">Huỷ</p>
					</v-timeline-item>
				</v-timeline>
			</v-col>
			<v-col cols="7">
				<label>Thông tin giỏ hàng</label>
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
								<template v-if="order.review">
									<v-icon
										v-if="
											order.review.likeItems.includes(item.productId) || true
										"
										:icon="mdiThumbUp"
										color="green-darken-2"
										:size="18"
										class="ml-2"
									/>
									<v-icon
										v-if="
											order.review.likeItems.includes(item.productId) || true
										"
										:icon="mdiThumbDown"
										color="red-darken-2"
										:size="18"
										class="ml-2"
									/>
								</template>
								<molecule-order-detail-item-option
									:option-item-keys="item.options"
								/>
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
													{{
														item.unitPrice.toLocaleString().replace(/,/g, '.')
													}}
													đ
												</p>
												<p class="text-right">
													{{
														item.unitSalePrice
															.toLocaleString()
															.replace(/,/g, '.')
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
				<template v-if="order.review">
					<label class="mt-4">Giá trị đơn hàng</label>
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
										(
											order.totalProductPrice +
											(order.voucher?.discountPrice || 0)
										)
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
										order.voucher.discountPrice
											.toLocaleString()
											.replace(/,/g, '.')
									}}
									&nbsp;đ
								</p>
							</div>
						</div>
						<v-divider class="mt-2 mb-1" />
						<div class="d-flex align-center justify-space-between">
							<p class="text-20px font-weight-bold text-grey-darken-3">
								Tổng cộng
							</p>
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
				</template>
			</v-col>
			<v-col
				v-if="order.review"
				cols="4"
				offset="1"
			>
				<label>Đánh giá</label>
				<v-rating
					v-model="order.review.rate"
					class="ma-2"
					:item-labels="rateComputed.labels"
					item-label-position="bottom"
					size="x-large"
					:active-color="rateComputed.color"
					readonly
				>
					<template #item-label="props">
						<span class="font-weight-medium text-14px">
							{{ props.label }}
						</span>
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
						density="comfortable"
						class="mr-2 mb-2 px-4"
						disabled
					>
						Dịch vụ
					</v-chip>
					<v-chip
						density="comfortable"
						class="mr-2 mb-2 px-4"
						disabled
					>
						Sản phẩm
					</v-chip>
					<v-chip
						density="comfortable"
						class="mr-2 mb-2 pl-4 pr-3 font-weight-medium"
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
						density="comfortable"
						class="mr-2 mb-2 pl-4 pr-3 font-weight-medium"
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
			</v-col>
			<v-col
				v-if="!order.review"
				cols="5"
				class="pl-12"
			>
				<label>Giá trị đơn hàng</label>
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
									(
										order.totalProductPrice +
										(order.voucher?.discountPrice || 0)
									)
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
									order.voucher.discountPrice
										.toLocaleString()
										.replace(/,/g, '.')
								}}
								&nbsp;đ
							</p>
						</div>
					</div>
					<v-divider class="mt-2 mb-1" />
					<div class="d-flex align-center justify-space-between">
						<p class="text-20px font-weight-bold text-grey-darken-3">
							Tổng cộng
						</p>
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
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { mdiCheck, mdiThumbUp, mdiThumbDown, mdiPencilOutline } from '@mdi/js'
import { shippingMethodName, ShippingMethod } from '~/constants'

const { data: order } = storeToRefs(useOrderDetail())

const orderTypeName = computed(() => {
	if (!order.value) return ''
	return shippingMethodName[order.value.type as ShippingMethod]
})

const rateColor = [
	'red-darken-3',
	'orange-darken-3',
	'yellow-darken-3',
	'lime-darken-3',
	'green-darken-3',
]
const rateLabel = ['Rất tệ', 'Tệ', 'Bình thường', 'Ngon', 'Rất ngon']
const rateComputed = computed(() => {
	let rate = order.value?.review.rate
	if (!rate) return { color: '', label: '' }

	if (rate > 5) rate = 5
	else if (rate < 1) rate = 1
	return {
		color: rateColor[rate - 1],
		labels: rateLabel.map((label, index) => {
			if (rate! - 1 !== index) return ''
			return label
		}),
	}
})
</script>

<style lang="scss" scoped>
.order-detail-container {
	padding: 0 16px;
	label {
		font-weight: bold;
		font-size: 14px;
		display: block;
		margin-bottom: 4px;
	}
	:deep(.v-timeline-divider__dot) {
		background-color: #ddd;
	}
	:deep(.v-timeline-item__body),
	:deep(.v-timeline-item__opposite) {
		padding-block: 8px !important;
		font-weight: 500;
	}
}
</style>
