<template>
	<v-sheet class="bg-transparent mb-4">
		<v-row>
			<v-col cols="4">
				<molecule-input
					v-model="roleName"
					input-type="text-field"
					label="Role name"
				/>
			</v-col>
			<v-col cols="8">
				<atom-label label="Permission list" />
				<lazy-organism-role-select-table
					v-model:permission-selected="permissionSelected"
					:init-fn="getInitSelected"
				/>
			</v-col>
		</v-row>
	</v-sheet>
</template>

<script setup lang="ts">
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

const getInitSelected = () => {
	roleDetail.value.permissions.forEach(permission => {
		permissionSelected[permission.featureName] = permission.scopes
	})
}

onMounted(() => {
	if (roleDetail.value) {
		getInitSelected()
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: 'Role not found',
		})
	}
})

watch(
	() => roleDetail.value,
	() => {
		getInitSelected()
	}
)

useListener('save-role-edit', async () => {
	permissions.value = permissionData.value.nameKeys.map(nameKey => {
		return {
			featureName: nameKey,
			scopes: permissionSelected[nameKey],
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
