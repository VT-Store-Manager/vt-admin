<template>
	<molecule-list-page-container page-name="Tài khoản">
		<template #title-right>
			<molecule-btn-refresh
				title="Làm mới"
				@click="accountListStore.refresh"
			/>
		</template>
		<template-account-admin-list />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
import { AccountAdminRoleItem, StoreListItemModel } from '~/models'

const { roleMap } = storeToRefs(useAccountAdminRoleList())
const { storeMap } = storeToRefs(useStoreList())
const accountListStore = useAccountAdminList()

if (!accountListStore.data) {
	accountListStore.refresh()
}

const _fullAccountData = computed(() => {
	return accountListStore.accountList.map(account => {
		return {
			...account,
			roles: account.roles
				.map<AccountAdminRoleItem>(roleId => {
					return roleMap.value.get(roleId) as any
				})
				.filter(r => !!r),
			stores: account.stores
				.map<StoreListItemModel>(storeId => {
					return storeMap.value.get(storeId) as any
				})
				.filter(s => !!s),
		}
	})
})
</script>
