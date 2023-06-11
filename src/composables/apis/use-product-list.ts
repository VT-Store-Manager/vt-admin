export interface ProductListItem {
	code: number
	name: string
	images: string[]
	originalPrice: number
	category: {
		id: string
		name: string
		code: number
	}
	updatedAt: string
	id: string
	status: string
	salesVolume: {
		month: number
	}
}

export interface ProductListPagination {
	totalCount: number
	items: ProductListItem[]
}

export const useProductList = definePiniaStore('product-list', () => {
	const { pagination, updatePage, pushPaginationQuery } = usePagination()
	const query = computed(() => ({ ...pagination }))
	const resetQuery = () => updatePage()
	const pushQuery = () => {
		pushPaginationQuery()
	}

	const { data, pending, error, refresh } = useRequest<ProductListPagination>(
		'/v1/admin/product/list',
		{
			query,
			transform: input => input.data,
			watch: [pagination],
		}
	)

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
