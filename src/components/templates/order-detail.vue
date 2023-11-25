<template>
	<div class="order-detail-container mb-10">
		<v-row
			v-if="order"
			class="mt-2"
		>
			<v-col cols="12">
				<organism-order-timeline />
			</v-col>
			<v-col
				cols="8"
				xl="9"
			>
				<organism-order-cart class="h-100" />
			</v-col>
			<v-col
				cols="4"
				xl="3"
			>
				<atom-labeled-sheet
					class="pt-10 pb-7 pt-8 h-100"
					label="Thông tin"
				>
					<label>Cửa hàng</label>
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
					<template v-if="order.employee">
						<label class="mt-3">Nhân viên</label>
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
											:to="`/store/employee/${order.employee.id}`"
											:class="[
												'transition-all',
												isHovering
													? ['text-primary', 'text-decoration-underline']
													: [],
											]"
										>
											{{ order.employee.name }}
										</atom-link>
									</template>
								</v-hover>
							</p>
							<p class="text-14px">
								<span class="font-weight-semibold">SĐT:</span>
								{{ order.employee.phone }}
							</p>
						</v-sheet>
					</template>

					<template v-if="order.member">
						<label class="mt-3">Người mua</label>
						<!-- <p
								class="text-white font-weight-bold d-inline-block rounded-pill py-1 px-2 mr-2 text-12px"
								:style="{ background: order.member.rankColor }"
							>
								{{ order.member.rankName }}
							</p> -->
						<v-sheet
							class="px-4 py-2 bg-grey-lighten-5"
							rounded="lg"
						>
							<p class="text-14px">
								<span class="font-weight-semibold">Tên: </span>
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
							<p class="text-14px mt-1 d-flex align-center">
								<span class="font-weight-semibold mr-1">Rank:</span>
								<v-chip
									:color="order.member.rankColor"
									density="compact"
									variant="tonal"
									class="font-weight-bold text-12px mr-2 px-2"
								>
									{{ order.member.rankName }}
								</v-chip>
							</p>
						</v-sheet>
					</template>

					<template v-if="order.receiver">
						<label class="mt-3">Người nhận</label>
						<v-sheet
							class="px-4 py-2 bg-grey-lighten-5"
							rounded="lg"
						>
							<p class="text-14px">
								<span class="font-weight-semibold">Tên:</span>
								{{ order.receiver.name }}
							</p>
							<p class="text-14px">
								<span class="font-weight-semibold">SĐT:</span>

								{{ order.receiver.phone.replace(/^\+?84/, '(+84) ') }}
							</p>
							<p class="text-14px">
								<span class="font-weight-semibold">Địa chỉ:</span>
								{{ order.receiver.address }}
							</p>
							<p class="text-14px">
								<span class="font-weight-semibold">Khoảng cách:</span>
								{{ (Math.random() * 10).toFixed(1) }} km
							</p>
							<p class="text-14px">
								<span class="font-weight-semibold"> Thời gian:</span>
								{{ $dayjs(order.receiver.timer).format('YYYY-MM-DD HH:mm:ss') }}
							</p>
						</v-sheet>
					</template>

					<template v-if="order.shipper">
						<label class="mt-3">Tài xế</label>
						<v-sheet
							class="px-4 py-2 bg-grey-lighten-5"
							rounded="lg"
						>
							<p class="text-14px">
								<span class="font-weight-semibold">Tên:</span>
								{{ order.shipper.name }}
							</p>
							<p class="text-14px">
								<span class="font-weight-semibold">SĐT:</span>

								{{ order.shipper.phone.replace(/^\+?84/, '(+84) ') }}
							</p>
						</v-sheet>
					</template>
				</atom-labeled-sheet>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
const { data: order } = storeToRefs(useOrderDetail())
</script>

<style lang="scss" scoped>
.order-detail-container {
	padding: 0 16px;
	:deep(label) {
		font-weight: bold;
		font-size: 14px;
		display: block;
		margin-bottom: 4px;
	}
}
</style>
