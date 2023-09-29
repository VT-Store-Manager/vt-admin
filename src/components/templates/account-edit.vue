<template>
	<v-sheet class="bg-transparent mb-4">
		<v-row>
			<v-col cols="4">
				<molecule-input
					:model-value="accountDetail?.username"
					input-type="text-field"
					label="Tên tài khoản"
					disabled
					optional
					hide-details
				/>
			</v-col>
			<v-col cols="4">
				<molecule-input
					:model-value="accountDetail?.name"
					input-type="text-field"
					label="Tên người dùng"
					disabled
					optional
					hide-details
				/>
			</v-col>
			<v-col cols="4">
				<molecule-input
					:model-value="data?.newPassword || '●●●●●●●●●●●●'"
					input-type="text-field"
					label="Mật khẩu"
					disabled
					optional
					hide-details
				/>
			</v-col>
			<v-col cols="6">
				<molecule-input
					v-model="roles"
					input-type="select"
					label="Phân quyền"
					:items="roleSelectItems"
					:loading="roleListStore.pending"
					bg-color="white"
					chips
					closable-chips
				/>
				<div v-if="roles.length">
					<p>Preview ({{ roles.length }})</p>
					<v-divider class="mt-1 mb-4" />
					<v-sheet
						v-for="roleId in roles"
						:key="roleId"
						class="d-flex align-center rounded-12 pa-3 justify-space-between mb-3 elevation-1"
					>
						<v-chip class="font-weight-semibold">
							{{ roleListStore.roleMap.get(roleId)?.name }}
						</v-chip>
						<p class="text-14px">
							<span
								v-for="(
									features, scope, index
								) in getRolePermissionShortDescription(roleId)"
								:key="scope"
							>
								{{ index > 0 ? ', ' : '' }}
								{{ $capitalize(scope) }} ({{ features.length }})
								<v-tooltip
									activator="parent"
									location="bottom center"
									open-delay="500"
								>
									<p
										v-for="feature in features"
										:key="feature"
									>
										{{ $capitalize(feature) }}
									</p>
								</v-tooltip>
							</span>
							<v-btn
								:icon="mdiClose"
								variant="plain"
								color="danger"
								density="comfortable"
								size="small"
								@click="pull(roles, roleId)"
							/>
						</p>
					</v-sheet>
				</div>
			</v-col>
			<v-col cols="6">
				<molecule-input
					v-model="stores"
					input-type="select"
					label="Cửa hàng quản lý"
					:items="storeSelectItems"
					:loading="storeListStore.pending"
					bg-color="white"
					chips
					closable-chips
				/>
				<div v-if="stores.length">
					<p>Preview ({{ stores.length }})</p>
					<v-divider class="mt-1 mb-4" />
					<v-sheet
						v-for="store in selectedStoreDetail"
						:key="store.id"
						class="d-flex align-center mb-2 rounded-12 pa-3 mb-3 elevation-1 relative"
					>
						<atom-img
							class="mr-4 rounded-12 small-img-shadow"
							:src="store.images[0]"
							:alt-src="store.images.slice(1)"
							height="80"
							max-width="100"
							aspect-ratio="1/1"
							server-img
							cover
							server-alt-img
							placeholder="progress"
						/>
						<div>
							<p class="font-weight-semibold">{{ store.name }}</p>
							<p class="text-14px">
								{{
									Object.values(store.address)
										.filter(s => !!s)
										.join(', ')
								}}
							</p>
						</div>
						<v-btn
							:icon="mdiClose"
							variant="plain"
							color="danger"
							density="comfortable"
							size="small"
							:style="{ position: 'absolute', top: '8px', right: '8px' }"
							@click="pull(stores, store.id)"
						/>
					</v-sheet>
				</div>
			</v-col>
		</v-row>
	</v-sheet>
</template>

<script setup lang="ts">
import { mdiClose } from '@mdi/js'
import pull from 'lodash/pull'
import { AccountAdminListItem } from '~/models'

const accountId = useRoute().params.accountId as string
const roles = ref<string[]>([])
const stores = ref<string[]>([])

const accountAdminList = useAccountAdminList()
const roleListStore = useAccountAdminRoleList()
const storeListStore = useStoreList()
const updateAccountStore = useUpdateAccountStore()
const { data } = storeToRefs(useResetPasswordStore())

const accountDetail = computed<AccountAdminListItem>(() => {
	return accountAdminList.accountMap.get(accountId)!
})

watch(roles, value => {
	roles.value = value.sort()
})
watch(stores, value => {
	stores.value = value.sort()
})

const roleSelectItems = computed(() => {
	return roleListStore.roleList.map(role => ({
		title: role.name,
		value: role.id,
	}))
})

const storeSelectItems = computed(() => {
	return storeListStore.items.map(store => ({
		title: store.name,
		value: store.id,
		disabled: store.disabled || store.deleted,
	}))
})

onBeforeMount(() => {
	if (!accountDetail.value) {
		roleListStore.refresh()
	} else {
		roles.value = accountDetail.value.roles
		stores.value = accountDetail.value.stores
	}
})
watch(
	() => accountDetail.value,
	value => {
		if (!value) {
			throw createError({ statusCode: 404, statusMessage: 'Account not found' })
		} else {
			roles.value = value.roles
			stores.value = value.stores
		}
	}
)

const getRolePermissionShortDescription = (roleId: string) => {
	const role = roleListStore.roleMap.get(roleId)
	if (!role) return null
	return role.permissions.reduce<Record<string, string[]>>(
		(res, permission) => {
			return permission.scopes.reduce<Record<string, string[]>>(
				(res2, scope) => {
					if (!res2[scope]) {
						res2[scope] = [permission.featureName]
					} else {
						res2[scope].push(permission.featureName)
					}
					return res2
				},
				res
			) as any
		},
		{}
	)
}

const selectedStoreDetail = computed(() => {
	return stores.value.map(
		storeId => storeListStore.items.find(item => item.id === storeId)!
	)
})

useListener('save-account-edit', async () => {
	await updateAccountStore.executeWithPayload(roles.value, stores.value)
	accountAdminList.refresh()
	useRouter().push('/account')
})
</script>

<style scoped></style>
