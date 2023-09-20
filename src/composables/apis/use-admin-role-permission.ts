import { AdminRolePermission } from '~/models'

export const useAdminRolePermission = defineStore(
	'admin-role-permission',
	() => {
		const { data, pending, error, refresh } = useRequest<AdminRolePermission>(
			'/account-admin/role/permission',
			{
				transform: input => input.data,
				default: () =>
					({
						nameKeys: [],
						permissionKeys: [],
					} as any),
			}
		)

		const permissionData = computed(() => data.value!)

		return { pending, error, data, permissionData, refresh }
	}
)

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useAdminRolePermission as any, import.meta.hot)
	)
}
