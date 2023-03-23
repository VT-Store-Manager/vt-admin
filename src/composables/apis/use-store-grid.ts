import { StoreGridModel } from '~/models/store'
import { BaseResponse } from '~/types'

type Pagination = {
	page: number
	limit: number
}

export const useStoreGrid = definePiniaStore('grid-store', () => {
	const router = useRouter()
	const { response, error, loading, fetchGet } = useRequest<
		BaseResponse<StoreGridModel>,
		Pagination
	>('/store/list')

	const pagination = reactive({
		page: 1,
		limit: 6
	})

	const fetch = () =>
		fetchGet({
			query: { page: pagination.page, limit: pagination.limit }
		})

	const defaultResponse: StoreGridModel = {
		items: [],
		maxCount: 0
	}

	watch(pagination, () => {
		router.push({
			query: {
				page: pagination.page,
				limit: pagination.limit
			}
		})
	})

	return { response, error, loading, fetch, pagination, defaultResponse }
})
