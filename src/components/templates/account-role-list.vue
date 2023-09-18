<template>
	<organism-data-table
		:headers="headers"
		:items="roleListStore.roleList"
		:loading="roleListStore.pending"
		:total-item-amount="roleListStore.roleList.length"
		editable
	>
		<template #permissions="{ item }">
			<v-chip-group
				v-if="item.permissions.length"
				class="d-flex flex-column"
			>
				<v-chip
					v-for="feature in item.permissions"
					:key="feature.featureName"
					:style="{ width: 'fit-content' }"
				>
					<span class="font-weight-semibold">
						{{ feature.featureName.toUpperCase() }}
					</span>
					: {{ feature.scopes.map((s: string) => s.toLowerCase()).join(', ') }}
				</v-chip>
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
					For
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
import { AccountAdminRoleItem } from '~/models'
import { TableHeader } from '~/types'

const headers: TableHeader<AccountAdminRoleItem>[] = [
	{
		title: 'Name',
		key: 'name',
	},
	{
		title: 'Permissions',
		key: 'permissions',
	},
	{
		title: 'Updated by',
		key: 'updatedBy',
	},
]

const roleListStore = useAccountAdminRoleList()
const { accountMap } = storeToRefs(useAccountAdminList())

const getAccountById = (accountId: string) => {
	return accountMap.value.get(accountId)
}
</script>

<style scoped></style>
