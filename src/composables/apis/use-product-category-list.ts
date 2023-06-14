import { Status } from '~/constants'

export interface ProductCategoryItem {
	id: string
	code: number
	name: string
	image: string
	status: Status
	amountOfProduct: number
	totalSold: number
	soldOfWeek: number
	order: number
	featured: boolean
	updatedAt: number
}

export interface ProductCategoryListPagination {
	totalCount: number
	items: ProductCategoryItem[]
}

export const useProductCategoryList = definePiniaStore(
	'product-category-list',
	() => {
		const { pagination, updatePage, pushPaginationQuery } = usePagination()
		const query = computed(() => ({ ...pagination }))
		const resetQuery = () => updatePage()
		const pushQuery = () => {
			pushPaginationQuery()
		}

		const { data, pending, error, refresh } =
			useRequest<ProductCategoryListPagination>(
				'/v1/admin/product-category/list',
				{
					query,
					transform: input => input.data,
					watch: [query],
				}
			)

		const items = computed(() => data?.value?.items || [])
		const totalProduct = computed(() => data?.value?.totalCount || 0)

		return {
			pagination,
			items,
			totalProduct,
			pending,
			error,
			refresh,
			updatePage,
			resetQuery,
			pushQuery,
		}
	}
)
