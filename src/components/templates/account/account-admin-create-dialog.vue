<template>
	<molecule-dialog
		v-model="show"
		:card-attrs="{}"
		:sheet-attrs="{
			width: '95%',
			maxWidth: '900px',
		}"
		title="Tạo admin mới"
		persistent
	>
		<template #headActions>
			<molecule-btn-reset @click="handleReset" />
		</template>
		<v-row>
			<v-col cols="4">
				<molecule-input
					v-model="username.value.value"
					input-type="text-field"
					label="Tên tài khoản"
					:error-messages="username.errorMessage.value"
				/>
			</v-col>
			<v-col cols="4">
				<molecule-input
					v-model="name.value.value"
					input-type="text-field"
					label="Tên người dùng"
					:error-messages="name.errorMessage.value"
				/>
			</v-col>
			<v-col cols="4">
				<molecule-input
					model-value="p@ssw0rd"
					input-type="text-field"
					label="Mật khẩu"
					disabled
					optional
					hide-details
				/>
			</v-col>
			<v-col cols="6">
				<molecule-input
					v-model="roles.value.value"
					input-type="select"
					label="Phân quyền"
					:items="roleSelectItems"
					:loading="roleListStore.pending"
					bg-color="white"
					chips
					closable-chips
					:error-messages="roles.errorMessage.value"
				/>
				<div v-if="roles.value.value.length">
					<p>Preview ({{ roles.value.value.length }})</p>
					<v-divider class="mt-1 mb-4" />
					<v-sheet
						v-for="roleId in roles.value.value"
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
								@click="roles.value.value = pull(roles.value.value, roleId)"
							/>
						</p>
					</v-sheet>
				</div>
			</v-col>
			<v-col cols="6">
				<molecule-input
					v-model="stores.value.value"
					input-type="select"
					label="Cửa hàng quản lý"
					:items="storeSelectItems"
					:loading="storeListStore.pending"
					bg-color="white"
					chips
					closable-chips
					:error-messages="stores.errorMessage.value"
				/>
				<div v-if="stores.value.value.length">
					<p>Preview ({{ stores.value.value.length }})</p>
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
						/>
					</v-sheet>
				</div>
			</v-col>
		</v-row>
		<template #actions>
			<molecule-btn-keep-and-close @click="show = false" />
			<molecule-btn-save-dialog
				:disabled="!isEmpty(errors) || isNotChanged"
				@click="onSave"
			/>
		</template>
	</molecule-dialog>
</template>

<script setup lang="ts">
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { mdiClose } from '@mdi/js'
import pull from 'lodash/pull'
import { useField, useForm } from 'vee-validate'
import { CreateAccountAdminModel, createAccountAdminSchema } from '~/models'

const { handleSubmit, handleReset, errors } = useForm<CreateAccountAdminModel>({
	validationSchema: createAccountAdminSchema,
})

const initData: CreateAccountAdminModel = {
	username: '',
	name: '',
	roles: [],
	stores: [],
}

const show = defineModel<boolean>('show', { default: false, local: true })
const username = useField<string>('username', undefined, {
	initialValue: initData.username,
})
const name = useField<string>('name', undefined, {
	initialValue: initData.name,
})
const roles = useField<string[]>('roles', undefined, {
	initialValue: initData.roles,
})
const stores = useField<string[]>('stores', undefined, {
	initialValue: initData.stores,
})

const isNotChanged = computed(() => {
	return isEqual(initData, {
		username: username.value.value,
		name: name.value.value,
		roles: roles.value.value,
		stores: stores.value.value,
	})
})

const roleListStore = useAccountAdminRoleList()
const storeListStore = useStoreList()

watch(roles.value, value => {
	roles.value.value = value.toSorted()
})
watch(stores.value, value => {
	stores.value.value = value.toSorted()
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

const selectedStoreDetail = computed(() => {
	return stores.value.value.map(
		storeId => storeListStore.items.find(item => item.id === storeId)!
	)
})
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

const body = ref<CreateAccountAdminModel>(initData)
const createAccountAdmin = useRequest<{ username: string; password: string }>(
	'/account-admin/create',
	{
		method: 'POST',
		body,
		immediate: false,
		transform: input => input.data,
	}
)
const { push } = useAlert()

const onSave = handleSubmit(async values => {
	body.value = values
	await createAccountAdmin.execute()
	if (createAccountAdmin.data.value) {
		push({
			text: 'Tạo admin mới thành công',
			description: `Username: ${createAccountAdmin.data.value.username}\nPassword: ${createAccountAdmin.data.value.password}`,
			type: 'success',
			duration: 5000,
		})
		show.value = false
		useAccountAdminList().refresh()
	} else {
		push({
			text: 'Tạo admin mới thất bại',
			description: createAccountAdmin.error.value?.message ?? undefined,
			type: 'error',
			duration: 15000,
		})
	}
})
</script>
