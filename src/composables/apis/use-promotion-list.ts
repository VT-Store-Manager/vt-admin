import { PaginationDataModel, PromotionListItemModel } from '~/models'

export const usePromotionList = definePiniaStore('promotion-list', () => {
	const { pagination, updatePage, pushPaginationQuery } = usePagination()
	const query = computed(() => ({ ...pagination }))
	const resetQuery = () => updatePage()
	const pushQuery = () => {
		pushPaginationQuery()
	}

	const { data, pending, error, refresh } = useRequest<
		PaginationDataModel<PromotionListItemModel>
	>('/promotion/list', {
		method: 'GET',
		query,
		transform: input => input.data,
		watch: [query],
	})

	const totalCount = computed(() => data.value?.totalCount || 0)
	const items = computed(() => data.value?.items || [])

	return {
		pagination,
		data,
		pending,
		error,
		refresh,
		totalCount,
		items,
		updatePage,
		resetQuery,
		pushQuery,
	}
})
