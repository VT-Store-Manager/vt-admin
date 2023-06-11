import { Status } from '~/constants'

export interface ProductCategoryItem {
	id: string
	name: string
	image: string
	code: number
	status: Status
	amountOfProduct: number
	totalSold: number
	soldOfWeek: number
	order: number
	featured: boolean
}

export interface ProductCategoryListPagination {
	totalCount: number
	items: ProductCategoryItem[]
}

export const useProductCategoryList = definePiniaStore(
	'product-category-list',
	() => {
		const { pagination, updatePage } = usePagination()

		const query = computed(() => ({ ...pagination }))
		const { data, pending, error, refresh } =
			useRequest<ProductCategoryListPagination>(
				'/v1/admin/product-category/list',
				{
					query,
					transform: input => input.data,
					watch: [query],
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
			pending,
			error,
			refresh,
			updatePage,
		}
	}
)
