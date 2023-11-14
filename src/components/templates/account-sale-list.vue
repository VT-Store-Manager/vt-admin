<template>
	<organism-data-table
		:headers="headers"
		:items="items"
		:pagination="pagination"
		:total-item-amount="totalAccount"
		:loading="pending"
		editable
		:update-page-fn="updatePage"
		@delete-item="onDeleteAccount"
	>
		<template #store="{ item }">
			<v-hover>
				<template #default="{ isHovering, props }">
					<atom-link
						:to="'/store/' + item.store.id"
						class="d-flex align-center py-2"
						v-bind="props"
					>
						<atom-img
							class="mr-4 rounded small-img-shadow"
							:src="item.store.image"
							height="40"
							max-width="40"
							aspect-ratio="1/1"
							:class="{ 'hover-blur': isHovering }"
							server-img
						/>
						<span
							class="ellipsis-2 text-16px font-weight-medium transition-color"
							:class="{ 'text-primary': isHovering }"
						>
							{{ item.store.name }}
						</span>
					</atom-link>
				</template>
			</v-hover>
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
import { AccountSaleListItem } from '~/models'
import { TableHeader } from '~/types'

const accountSaleList = useAccountSaleList()
const { items, totalAccount, pending, pagination } =
	storeToRefs(accountSaleList)
const { accountMap: accountAdminMap } = storeToRefs(useAccountAdminList())
const { updatePage } = accountSaleList
const { push } = useAlert()

const headers = computed<TableHeader<AccountSaleListItem>[]>(() => {
	return [
		{
			title: 'Tên tài khoản',
			key: 'username',
			sortable: true,
		},
		{
			title: 'Thuộc cửa hàng',
			key: 'store',
			sortable: true,
		},
		{
			title: 'Cập nhật bởi',
			key: 'updatedBy',
			sortable: true,
		},
		{
			title: 'Tạo lúc',
			key: 'createdAt',
			sortable: true,
			centerHead: true,
		},
	]
})

const getAccountAdminById = (accountId: string) => {
	return accountAdminMap.value.get(accountId)
}

const onDeleteAccount = async (item: AccountSaleListItem) => {
	const { data: success } = await useRequest(`/account-sale/${item.id}`, {
		method: 'DELETE',
	})
	if (success.value) {
		await useAccountSaleList().refresh()
		push({
			type: 'success',
			text: 'Delete account sale successfully',
			duration: 5000,
		})
	} else {
		push({
			type: 'error',
			text: 'Delete account sale failed',
			duration: 5000,
		})
	}
}
</script>

<style scoped></style>
