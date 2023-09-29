export const useUpdateAccountStore = defineStore('update-account', () => {
	const roles = ref<string[]>([])
	const stores = ref<string[]>([])

	const body = computed(() => {
		return {
			roles: roles.value,
			stores: stores.value,
		}
	})

	const { data, pending, error, execute, status } = useRequest<boolean>(
		'/account-admin/update-role',
		{
			method: 'PATCH',
			body,
			immediate: false,
		}
	)

	const executeWithPayload = async (_roles: string[], _stores: string[]) => {
		roles.value = _roles
		stores.value = _stores
		await execute()
	}

	return {
		data,
		pending,
		status,
		error,
		execute,
		executeWithPayload,
		roles,
		stores,
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useUpdateAccountStore as any, import.meta.hot)
	)
}
