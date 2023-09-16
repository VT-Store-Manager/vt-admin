import { AccountAdminRoleItem } from '~/models'

export const useAccountAdminRoleList = definePiniaStore(
	'account-admin-role-list',
	() => {
		const { data, pending, error, execute, refresh } = useRequest<
			AccountAdminRoleItem[]
		>('/account-admin/role/list', {
			transform: input => input.data,
		})
		const storedData = ref<AccountAdminRoleItem[]>([])

		watch(data, value => {
			if (value) {
				storedData.value = value
			}
		})

		const roleList = computed(() => {
			if (storedData.value.length === 0) {
				return data.value || []
			}
			return storedData.value
		})

		const roleMap = computed(() => {
			return new Map(roleList.value.map(role => [role.id, role]))
		})

		return {
			data,
			storedData,
			roleList,
			roleMap,
			pending,
			error,
			execute,
			refresh,
		}
	}
)

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useAccountAdminList as any, import.meta.hot)
	)
}
