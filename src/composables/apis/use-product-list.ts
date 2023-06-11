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
	const { pagination, updatePage } = usePagination({ page: 1, limit: 10 })

	const query = computed(() => ({ ...pagination }))

	const { data, pending, error, refresh } = useRequest<ProductListPagination>(
		'/v1/admin/product/list',
		{
			query,
			transform: input => input.data,
			watch: [pagination],
		},
		{
			pushQuery: true,
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
	}
})
