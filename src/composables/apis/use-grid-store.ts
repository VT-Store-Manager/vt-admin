import { StoreGridItemModel } from '~/models/store/grid-item'

export const useStore = definePiniaStore('store', () => {
	const pagination = 6

	const {
		response: data,
		error,
		loading,
		fetchGet: fetch
	} = useRequest<StoreGridItemModel[]>('/store-grid.json')

	return { data, error, loading, fetch, pagination }
})
