import { PaginationDataModel, StoreListItemModel } from '~/models'

export const useStoreList = definePiniaStore('store-list', () => {
	const { pagination, updatePage, pushPaginationQuery } = usePagination()
	const query = computed(() => ({ ...pagination }))
	const resetQuery = () => updatePage()
	const pushQuery = () => {
		pushPaginationQuery()
	}

	const { data, pending, error, refresh } = useRequest<
		PaginationDataModel<StoreListItemModel>
	>('/store/list', {
		query,
		transform: input => input.data,
		watch: [query],
	})

	const totalCount = computed(() => data.value?.totalCount || 0)
	const items = computed(() => data.value?.items || [])

	return {
		pagination,
		updatePage,
		data,
		pending,
		error,
		refresh,
		totalCount,
		items,
		resetQuery,
		pushQuery,
	}
})
