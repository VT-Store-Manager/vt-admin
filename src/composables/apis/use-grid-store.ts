import { StoreGridItemModel } from '~/models/store'

export const useStore = definePiniaStore('store', () => {
	const pagination = 6

	const {
		response: data,
		error,
		loading,
		fetchGet: fetch
	} = useRequest<StoreGridItemModel[]>('/public/store-grid.json')

	return { data, error, loading, fetch, pagination }
})
