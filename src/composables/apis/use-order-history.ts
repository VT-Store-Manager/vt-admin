import { SortOrder } from '~/constants'
import { OrderHistoryItem, PaginationDataModel } from '~/models'

type SearchOrderQuery = {
	store?: string
	from?: number
	to?: number
	order?: SortOrder
}

export const useOrderHistory = definePiniaStore('order-history-list', () => {
	const { pagination, updatePage, pushPaginationQuery } = usePagination()
	const searchQuery = reactive<SearchOrderQuery>({})
	const query = computed(() => ({ ...pagination, ...searchQuery }))
	const resetQuery = () => updatePage()
	const pushQuery = () => {
		pushPaginationQuery()
	}

	const { data, pending, error, refresh } = useRequest<
		PaginationDataModel<OrderHistoryItem>
	>('/order/history', {
		query,
		transform: input => input.data,
		watch: [pagination],
	})

	const items = computed(() => data?.value?.items || [])
	const totalCount = computed(() => data?.value?.totalCount || 0)

	return {
		pagination,
		items,
		totalCount,
		data,
		pending,
		error,
		refresh,
		updatePage,
		resetQuery,
		pushQuery,
	}
})
