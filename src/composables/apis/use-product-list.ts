import { PaginationDataModel, ProductListItemModel } from '~/models'

export const useProductList = definePiniaStore('product-list', () => {
	const { pagination, updatePage, pushPaginationQuery } = usePagination()
	const query = computed(() => ({ ...pagination }))
	const resetQuery = () => updatePage()
	const pushQuery = () => {
		pushPaginationQuery()
	}

	const { data, pending, error, refresh } = useRequest<
		PaginationDataModel<ProductListItemModel>
	>('/product/list', {
		query,
		transform: input => input.data,
		watch: [pagination],
	})

	const items = computed(() => data?.value?.items || [])
	const totalProduct = computed(() => data?.value?.totalCount || 0)

	return {
		pagination,
		items,
		totalProduct,
		data,
		pending,
		error,
		refresh,
		updatePage,
		resetQuery,
		pushQuery,
	}
})
