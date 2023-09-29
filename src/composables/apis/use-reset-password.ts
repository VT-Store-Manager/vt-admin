export const useResetPasswordStore = defineStore('reset-password', () => {
	const accountId = ref('')

	const body = computed(() => {
		return {
			accountId: accountId.value,
		}
	})

	const { data, pending, status, error, execute } = useRequest<{
		newPassword: string
	}>('/account-admin/reset-password', {
		method: 'PATCH',
		body,
		default: () => ({ newPassword: '' } as any),
		transform: input => input.data,
		immediate: false,
	})

	const executeWithPayload = async (_accountId: string) => {
		accountId.value = _accountId
		await execute()
	}

	return { data, pending, status, error, executeWithPayload }
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useResetPasswordStore as any, import.meta.hot)
	)
}
