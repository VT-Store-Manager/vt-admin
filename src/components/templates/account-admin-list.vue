<template>
	<organism-data-table
		:headers="headers"
		:items="accountList"
		:loading="pending"
		:total-item-amount="accountList.length"
		editable
	>
		<template #name="{ item }">
			<v-hover>
				<template #default="{ isHovering: hoveringName, props: nameProps }">
					<atom-link
						:to="'/account/admin/' + item.username + '/edit'"
						class="d-flex align-center py-2"
						v-bind="nameProps"
					>
						<atom-img
							class="mr-4 rounded small-img-shadow"
							:src="item.avatar"
							height="50"
							max-width="50"
							aspect-ratio="1/1"
							:class="{ 'hover-blur': hoveringName }"
							cover
							placeholder="progress"
						/>
						<div>
							<p
								class="ellipsis-2 text-16px font-weight-medium transition-color"
								:class="{ 'text-primary': hoveringName }"
							>
								{{ item.name }}
							</p>
							<p class="text-grey-darken-4">ID: {{ item.username }}</p>
						</div>
					</atom-link>
				</template>
			</v-hover>
		</template>
		<template #roles="{ item }">
			<v-chip-group>
				<v-chip
					v-for="role in getRoleNames(item.roles)"
					:key="role.id"
					class="font-weight-semibold"
				>
					<atom-link :to="`/account/admin/role/${role.id}/edit`">
						{{ role.name }}
					</atom-link>
				</v-chip>
			</v-chip-group>
		</template>
		<template #stores="{ item }">
			{{
				getStoreNames(item.stores)
					.map(item => item.name)
					.join(', ') || 'Tất cả cửa hàng'
			}}
		</template>
		<template #updatedAt="{ item }">
			<molecule-date-from-now
				:date="item.updatedAt"
				class="text-center text-16px"
			/>
		</template>
	</organism-data-table>
</template>

<script lang="ts" setup>
import { AccountAdminListItem } from '~/models'

import { TableHeader } from '~/types'

const accountListStore = useAccountAdminList()
const { roleMap } = storeToRefs(useAccountAdminRoleList())
const { storeMap } = storeToRefs(useStoreList())
const { accountList, pending } = storeToRefs(accountListStore)

const headers: TableHeader<AccountAdminListItem>[] = [
	{
		title: 'Name',
		key: 'name',
		sortable: true,
	},
	{
		title: 'Role',
		key: 'roles',
	},
	{
		title: 'Stores',
		key: 'stores',
	},
	{
		title: 'Last updated',
		key: 'updatedAt',
		sortable: true,
		centerHead: true,
		default: Date.now(),
	},
]

const getRoleNames = (roles: string[]) => {
	return roles.map(roleId => roleMap.value.get(roleId)!).filter(role => !!role)
}

const getStoreNames = (stores: string[]) => {
	return stores
		.map(storeId => storeMap.value.get(storeId)!)
		.filter(store => !!store)
}
</script>
