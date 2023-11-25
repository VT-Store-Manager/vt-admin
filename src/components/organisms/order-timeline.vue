<template>
	<atom-labeled-sheet
		v-if="order"
		class="pb-7 pt-8"
		label="Trạng thái"
	>
		<v-timeline
			direction="horizontal"
			line-inset="6"
			class="px-4"
		>
			<v-timeline-item dot-color="green-darken-1">
				<p class="text-14px">Tạo đơn</p>
				<template #icon>
					<v-icon
						:icon="mdiReceiptTextCheck"
						:size="20"
					/>
				</template>
				<template #opposite>
					<p
						class="text-12px text-grey"
						:title="
							$capitalize(
								$dayjs(new Date(order.createdAt)).format(
									'dddd, YYYY-MM-DD HH:mm:ss Z'
								)
							)
						"
					>
						{{ $dayjs(order.createdAt).format('HH:mm') }}
					</p>
				</template>
			</v-timeline-item>
			<v-timeline-item
				dot-color="green-darken-1"
				:icon="mdiStoreCheck"
			>
				<p class="text-14px">Đã xác nhận</p>
				<template #icon>
					<v-icon
						:icon="mdiStoreCheck"
						:size="20"
					/>
				</template>
				<template #opposite>
					<p class="text-12px text-grey">
						{{ $dayjs(order.createdAt).format('HH:mm') }}
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
	</atom-labeled-sheet>
</template>

<script setup lang="ts">
import { mdiStoreCheck, mdiReceiptTextCheck } from '@mdi/js'

const { data: order } = storeToRefs(useOrderDetail())
</script>

<style lang="scss" scoped>
:deep(.v-timeline-divider__dot) {
	background-color: #ddd;
}
:deep(.v-timeline-item__body),
:deep(.v-timeline-item__opposite) {
	padding-block: 8px !important;
	font-weight: 500;
}
</style>
