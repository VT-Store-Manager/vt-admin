import { CreateAccountSaleBody } from '~/models'

export const useCreateAccountSale = defineStore('create-account-sale', () => {
	const username = ref('')
	const storeId = ref('')

	const body = computed<CreateAccountSaleBody>(() => {
		return {
			username: username.value,
			storeId: storeId.value,
		}
	})

	const {
		data: success,
		pending,
		error,
		execute,
		status,
	} = useRequest<boolean>('/account-sale/create', {
		method: 'POST',
		body,
		immediate: false,
	})

	const executeWithPayload = async (payload: CreateAccountSaleBody) => {
		username.value = payload.username
		storeId.value = payload.storeId
		await execute()
	}

	return { success, pending, error, status, executeWithPayload }
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useCreateAccountRole as any, import.meta.hot)
	)
}
