import { AccountAdminRoleItem } from '~/models'

export const useUpdateAccountRoleStore = defineStore(
	'use-update-account-role',
	() => {
		const roleName = ref('')
		const roleId = ref('')
		const permissions = ref<AccountAdminRoleItem['permissions']>([])

		const body = computed(() => {
			return {
				id: roleId.value,
				name: roleName.value,
				permissions: permissions.value,
			}
		})

		const { data, pending, error, execute, status } = useRequest<boolean>(
			'/account-admin/role/update',
			{
				method: 'PUT',
				body,
				immediate: false,
			}
		)

		return {
			data,
			pending,
			status,
			error,
			execute,
			roleId,
			roleName,
			permissions,
		}
	}
)

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useUpdateAccountRoleStore as any, import.meta.hot)
	)
}
