import { defineStore, acceptHMRUpdate } from 'pinia'

type RequestBody = {
	storeId: string
	product: string[]
	category: string[]
	option: string[]
}

export const useUpdateStoreUnavailable = defineStore(
	'update-store-unavailable',
	() => {
		const body = reactive<RequestBody>({
			storeId: '',
			product: [],
			category: [],
			option: [],
		})

		const {
			data: isSuccess,
			pending,
			error,
			execute,
			status,
		} = useRequest<boolean>('/store/unavailable-goods', {
			method: 'PATCH',
			body,
			immediate: false,
		})

		const executeWithPayload = async (payload: RequestBody) => {
			Object.assign(body, payload)
			await execute()
		}

		return { isSuccess, pending, error, execute, status, executeWithPayload }
	}
)

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useUpdateStoreUnavailable as any, import.meta.hot)
	)
}
