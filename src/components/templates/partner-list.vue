<template>
	<organism-data-table
		:headers="headers"
		:items="items"
		:loading="pending"
		editable
	>
		<template #name="{ item }">
			<v-hover>
				<template #default="{ isHovering: hoveringName, props: nameProps }">
					<atom-link
						:to="'/partner/' + item.id"
						class="d-flex align-center"
						v-bind="nameProps"
					>
						<atom-img
							class="mr-4 my-2 rounded-lg small-img-shadow"
							:src="item.image"
							height="50"
							:max-width="50"
							:aspect-ratio="1"
							cover
							:class="{ 'hover-blur': hoveringName }"
							server-img
							placeholder="progress"
						/>
						<div class="d-flex flex-column justify-center py-1">
							<span
								class="ellipsis-2"
								:class="{ 'text-primary-darken': hoveringName }"
							>
								{{ item.name }}
							</span>
							<span class="text-12px font-weight-bold">{{ item.code }}</span>
						</div>
					</atom-link>
				</template>
			</v-hover>
		</template>
		<template #voucherCount="{ item }">
			<div class="d-flex align-center justify-center">
				<p class="text-16px font-weight-semibold text-primary-darken">
					{{ item.voucherCount }}
				</p>
				<v-icon
					:icon="mdiTicketPercent"
					size="small"
					class="ml-1"
					color="primary-darken"
				/>
			</div>
		</template>
		<template #createdAt="{ item }">
			<molecule-date-from-now
				:date="item.createdAt"
				class="text-center text-16px"
			/>
		</template>
		<template #updatedAt="{ item }">
			<molecule-date-from-now
				:date="item.updatedAt"
				class="text-center text-16px"
			/>
		</template>
	</organism-data-table>
</template>

<script setup lang="ts">
import { mdiTicketPercent } from '@mdi/js'
import { PartnerListItemDTO } from '~/models'
import { TableHeader } from '~/types'

const partnerList = usePartnerList()
const { items, pending } = storeToRefs(partnerList)

const headers: TableHeader<PartnerListItemDTO>[] = [
	{
		title: 'Tên đối tác',
		key: 'name',
		sortable: true,
	},
	{
		title: 'Số lượng ưu đãi',
		key: 'voucherCount',
		sortable: true,
		centerHead: true,
	},
	{
		title: 'Thời gian tạo',
		key: 'createdAt',
		sortable: true,
		centerHead: true,
	},
	{
		title: 'Thời gian cập nhật',
		key: 'updatedAt',
		sortable: true,
		centerHead: true,
	},
]
</script>

<style scoped></style>
