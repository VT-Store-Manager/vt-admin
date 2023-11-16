<template>
	<organism-data-table
		:headers="headers"
		:items="items"
		:pagination="pagination"
		:total-item-amount="totalShipper"
		:loading="pending"
		editable
		:update-page-fn="updatePage"
	>
		<template #name="{ item }">
			<v-hover>
				<template #default="{ isHovering, props }">
					<nuxt-link
						v-bind="props"
						:to="`/shipper/${item.id}`"
						class="d-flex align-center"
						:style="{ height: '70px' }"
					>
						<atom-img
							class="mr-4 rounded-circle small-img-shadow"
							:src="item.avatar"
							height="50"
							max-width="50"
							aspect-ratio="1/1"
							server-img
						/>
						<div>
							<p class="font-weight-medium d-flex align-center text-16px">
								<molecule-icon-gender
									:gender="item.gender"
									class="mr-1"
								/>
								<span
									class="transition-color pb-1"
									:class="{
										'text-primary': isHovering,
									}"
								>
									{{ item.name }}
								</span>
							</p>
							<p class="text-14px">
								{{ getPhoneFormat(item.phone) }}
							</p>
						</div>
					</nuxt-link>
				</template>
			</v-hover>
		</template>
		<template #dob="{ item }">
			<atom-date-cell
				:date="item.dob"
				time-format=""
				font-size="16"
			/>
		</template>
		<template #createdAt="{ item }">
			<molecule-date-from-now
				:date="item.createdAt"
				class="text-center text-16px"
			/>
		</template>
		<template #updatedBy="{ item }">
			<div
				v-if="item.updatedBy"
				class="updated-by py-2"
			>
				<div class="d-flex align-center">
					<atom-link
						:to="`/account/${item.updatedBy.accountId}/detail`"
						class="font-weight-bold"
					>
						<v-avatar
							:image="getAccountAdminById(item.updatedBy.accountId)?.avatar"
							size="25"
							class="rounded-pill small-img-shadow ml-2 mr-1"
						/>
						{{
							getAccountAdminById(item.updatedBy.accountId)?.username ||
							item.updatedBy.accountUsername
						}}
					</atom-link>
				</div>
				<div>
					<molecule-date-from-now
						:date="item.updatedBy.time"
						:tooltip-props="{ location: 'bottom' }"
						class="text-16px d-inline"
					/>
				</div>
			</div>
			<p v-else></p>
		</template>
	</organism-data-table>
</template>

<script setup lang="ts">
import { ShipperListItemModel } from '~/models'
import { TableHeader } from '~/types'

const shipperList = useShipperList()
const { items, totalShipper, pending, pagination } = storeToRefs(shipperList)
const { accountMap: accountAdminMap } = storeToRefs(useAccountAdminList())
const { updatePage } = shipperList

const headers = computed<TableHeader<ShipperListItemModel>[]>(() => {
	return [
		{
			title: 'Tên tài xế',
			key: 'name',
			sortable: true,
		},
		{
			title: 'Ngày sinh',
			key: 'dob',
			sortable: true,
		},
		{
			title: 'Cập nhật bởi',
			key: 'updatedBy',
			sortable: true,
		},
		{
			title: 'Thời gian tạo',
			key: 'createdAt',
			sortable: true,
			centerHead: true,
		},
	]
})

const getAccountAdminById = (accountId: string) => {
	return accountAdminMap.value.get(accountId)
}
</script>

<style scoped></style>
