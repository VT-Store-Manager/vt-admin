import { defineStore, acceptHMRUpdate } from 'pinia'

type RequestBody = {
	storeId: string
	name: string
	openTime: { start: string; end: string }
	address: {
		street: string
		ward?: string
		district: string
		city: string
		country: string
	}
	lat?: number
	lng?: number
}

export const useUpdateStoreInfo = defineStore('update-store-info', () => {
	const body = reactive<RequestBody>({
		storeId: '',
		name: '',
		openTime: { start: '', end: '' },
		address: {
			street: '',
			ward: '',
			district: '',
			city: '',
			country: '',
		},
	})

	const {
		data: isSuccess,
		pending,
		error,
		execute,
		status,
	} = useRequest<boolean>('/store/info', {
		method: 'PATCH',
		body,
		immediate: false,
	})

	const executeWithPayload = async (payload: RequestBody) => {
		Object.assign(body, payload)
		await execute()
	}

	return { isSuccess, pending, error, execute, status, executeWithPayload }
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useUpdateStoreInfo as any, import.meta.hot)
	)
}
