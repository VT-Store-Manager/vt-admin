import { defineStore, acceptHMRUpdate } from 'pinia'
import { AccountAdminRoleItem } from '~/models'

export const useCreateAccountRole = defineStore('create-account-role', () => {
	const roleName = ref('')
	const permissions = ref<AccountAdminRoleItem['permissions']>([])

	const body = computed(() => {
		return {
			name: roleName.value,
			permissions: permissions.value,
		}
	})

	const { data, pending, error, execute, status } = useRequest<boolean>(
		'/account-admin/role/create',
		{
			method: 'POST',
			body,
			immediate: false,
		}
	)

	const executeWithPayload = async (
		_roleName: string,
		_permissions: AccountAdminRoleItem['permissions']
	) => {
		roleName.value = _roleName
		permissions.value = _permissions
		await execute()
	}

	return { data, pending, error, status, executeWithPayload }
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useCreateAccountRole as any, import.meta.hot)
	)
}
