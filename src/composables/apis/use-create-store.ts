import { StoreModel, CreateStoreModel } from '~/models/store/index'
import { BaseResponse } from '~/types'

export const useCreateStore = definePiniaStore('create-store', () => {
	const { response, loading, error, fetch } = useRequest<
		BaseResponse<StoreModel>,
		CreateStoreModel
	>('/store/create', {
		method: 'POST'
	})

	return { response, loading, error, fetch }
})
