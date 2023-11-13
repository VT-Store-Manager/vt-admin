<template>
	<organism-data-table
		:headers="headers"
		:items="roleListStore.roleList"
		:loading="roleListStore.pending"
		:total-item-amount="roleListStore.roleList.length"
		editable
		@delete-item="onDeleteItem"
	>
		<template #name="{ item }">
			<p class="text-16px">{{ item.name }}</p>
			<div class="text-grey text-14px mt-1">
				<atom-link
					v-for="account in getAccountByRole(item.id)"
					:key="account.id"
					:to="`/account/${account.username}/detail`"
				>
					<v-avatar
						:image="account.avatar"
						:size="24"
						class="cursor-pointer"
					/>
					<v-tooltip
						activator="parent"
						location="bottom center"
					>
						<p>
							{{ account.name }}
						</p>
						<p>ID: {{ account.username }}</p>
					</v-tooltip>
				</atom-link>
			</div>
		</template>
		<template #permissions="{ item }">
			<v-chip-group v-if="item.permissions.length">
				<template
					v-for="feature in item.permissions"
					:key="feature.featureName"
				>
					<v-chip
						v-if="feature.scopes.length"
						:style="{ width: 'fit-content' }"
						class="font-weight-semibold"
						density="comfortable"
					>
						{{ capitalize(feature.featureName) }} ({{ feature.scopes.length }})
						<v-tooltip
							activator="parent"
							location="bottom center"
							open-delay="300"
						>
							{{ feature.scopes.join(', ') }}
						</v-tooltip>
					</v-chip>
				</template>
			</v-chip-group>
			<template v-else> N/A </template>
		</template>
		<template #updatedBy="{ item }">
			<div class="updated-by py-2">
				<div class="d-flex align-center">
					By
					<atom-link
						:to="`/account/${item.updatedBy.accountId}/detail`"
						class="font-weight-bold"
					>
						<v-avatar
							:image="getAccountById(item.updatedBy.accountId)?.avatar"
							size="25"
							class="rounded-pill small-img-shadow ml-2 mr-1"
						/>
						{{
							getAccountById(item.updatedBy.accountId)?.username ||
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
		</template>
	</organism-data-table>
</template>

<script setup lang="ts">
import capitalize from 'lodash/capitalize'
import { AccountAdminRoleItem } from '~/models'
import { TableHeader } from '~/types'

const headers: TableHeader<AccountAdminRoleItem>[] = [
	{
		title: 'Name',
		key: 'name',
		width: 150,
	},
	{
		title: 'Permissions',
		key: 'permissions',
	},
	{
		title: 'Updated by',
		key: 'updatedBy',
		width: 170,
	},
]

const roleListStore = useAccountAdminRoleList()
const { push } = useAlert()
const { accountMap, accountList } = storeToRefs(useAccountAdminList())

const getAccountById = (accountId: string) => {
	return accountMap.value.get(accountId)
}

const getAccountByRole = (roleId: string) => {
	return accountList.value.filter(account => account.roles.includes(roleId))
}

const onDeleteItem = async (item: AccountAdminRoleItem) => {
	const { data, error, execute } = useRequest<boolean>(
		`/account-admin/role/${item.id}/disable`,
		{
			method: 'DELETE',
			immediate: false,
		}
	)
	await execute()
	if (data.value) {
		roleListStore.refresh()
		push({
			type: 'success',
			text: 'Remove role successfully',
			duration: 5000,
		})
	} else if (error.value) {
		push({
			type: 'error',
			text: 'Remove role failed',
			// description: error.value.message,
			duration: 15000,
		})
	}
}
</script>

<style scoped></style>
