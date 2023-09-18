<template>
	<v-sheet class="bg-transparent mb-4">
		<v-row>
			<v-col cols="4">
				<molecule-input
					v-model="roleName"
					input-type="text-field"
					label="Product name"
				/>
			</v-col>
			<v-col cols="8">
				<atom-label label="Permission list" />
				<v-table class="rounded-12 px-4 pb-2">
					<thead>
						<tr>
							<th class="text-left font-weight-bold">Feature name</th>
							<th
								class="text-center font-weight-bold text-primary"
								width="13%"
							>
								All
							</th>
							<th
								v-for="permission in permissionData.permissionKeys"
								:key="permission"
								class="text-center font-weight-bold text-14px"
								:class="`text-${permissionColor[permission]}`"
								width="15%"
							>
								{{ capitalize(permission) }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="nameKey in permissionData.nameKeys"
							:key="nameKey"
						>
							<td>
								<p class="font-weight-semibold pt-2 mr-2">
									{{ capitalize(nameKey) }}
								</p>
								<v-chip-group v-if="getSortedPermission(nameKey).length">
									<v-chip
										v-for="key in getSortedPermission(nameKey)"
										:key="key"
										:class="[
											`text-${permissionColor[key]}`,
											'font-weight-semibold',
											'mr-1 mt-0 mb-2',
										]"
										size="small"
									>
										{{ key }}
									</v-chip>
								</v-chip-group>
								<v-chip
									v-else
									class="text-grey mt-1 mb-3"
									size="small"
								>
									None
								</v-chip>
							</td>
							<td>
								<v-checkbox
									hide-details
									color="primary"
									:model-value="isSelectAll(nameKey)"
									:indeterminate="isIndeterminate(nameKey)"
									@click="onSelectAll(nameKey)"
								/>
							</td>
							<td
								v-for="permission in permissionData.permissionKeys"
								:key="permission"
							>
								<v-checkbox
									v-model="permissionSelected[nameKey]"
									:value="permission"
									:color="permissionColor[permission]"
									hide-details
								/>
							</td>
						</tr>
					</tbody>
				</v-table>
			</v-col>
		</v-row>
	</v-sheet>
</template>

<script setup lang="ts">
import { capitalize } from 'lodash'
import { useListener } from '../../composables/use-event-bus'

const route = useRoute()
const roleListStore = useAccountAdminRoleList()
const accountListStore = useAccountAdminList()
const { permissionData } = storeToRefs(useAdminRolePermission())
const updateAccountRoleStore = useUpdateAccountRoleStore()
const { roleId, roleName, permissions } = storeToRefs(updateAccountRoleStore)

roleId.value = route.params.id as string
const roleDetail = computed(() => {
	return roleListStore.roleMap.get(roleId.value)!
})

roleName.value = roleDetail.value?.name || ''
const permissionSelected = reactive<Record<string, string[]>>(
	permissionData.value?.nameKeys.reduce<Record<string, string[]>>(
		(obj, key) => {
			obj[key] = []
			return obj
		},
		{}
	) || {}
)
const colorList = [
	'red-darken-2',
	'green-darken-3',
	'deep-purple-darken-1',
	'blue-darken-1',
]
const permissionColor = reactive<Record<string, string>>(
	permissionData.value?.permissionKeys.reduce<Record<string, string>>(
		(obj, key, index) => {
			obj[key] = colorList[index]
			return obj
		},
		{}
	) || {}
)

const getInitSelected = () => {
	roleDetail.value.permissions.forEach(permission => {
		permissionSelected[permission.featureName] = permission.scopes
	})
}

if (roleDetail.value) {
	getInitSelected()
} else {
	throw createError({
		statusCode: 404,
		statusMessage: 'Role not found',
	})
}

watch(
	() => roleDetail.value,
	() => {
		getInitSelected()
	}
)

watch(permissionData, value => {
	if (!value) return
	value.nameKeys.forEach(key => {
		if (permissionSelected[key]) return
		permissionSelected[key] = []
	})
	value.permissionKeys.forEach((key, index) => {
		permissionColor[key] = colorList[index]
	})
})

const isIndeterminate = (nameKey: string) => {
	const permissionLength = permissionData.value.permissionKeys.length
	return (
		permissionSelected[nameKey].length > 0 &&
		permissionSelected[nameKey].length < permissionLength
	)
}

const isSelectAll = (nameKey: string) => {
	return (
		permissionData.value.permissionKeys.length ===
		permissionSelected[nameKey].length
	)
}

const onSelectAll = (nameKey: string) => {
	if (isSelectAll(nameKey)) {
		permissionSelected[nameKey] = []
	} else {
		permissionSelected[nameKey] = permissionData.value.permissionKeys
	}
}

const getSortedPermission = (nameKey: string) => {
	return permissionData.value.permissionKeys.filter(pKey => {
		return permissionSelected[nameKey]?.includes(pKey)
	})
}

useListener('save-role-edit', async () => {
	permissions.value = permissionData.value.nameKeys.map(nameKey => {
		return {
			featureName: nameKey,
			scopes: getSortedPermission(nameKey),
		}
	})
	await updateAccountRoleStore.execute()
	if (updateAccountRoleStore.data) {
		roleListStore.refresh()
		accountListStore.refresh()
		useRouter().push('/account/role')
	}
})
</script>

<style scoped>
:deep(.v-checkbox-btn) {
	justify-content: center;
}
</style>
