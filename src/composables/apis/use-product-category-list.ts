import { Status } from '~/constants'
import { DataResponse } from '~/types/request'

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
		const query = reactive({
			page: 1,
			limit: 10,
		})
		const { data, pending, error, refresh, execute } = useRequest<
			DataResponse<ProductCategoryListPagination>,
			ProductCategoryListPagination
		>('/v1/admin/product-category/list', {
			method: 'GET',
			query,
			transform(input) {
				return input.data
			},
			watch: [query],
		})

		const updatePage = (pagination: { page: number; limit: number }) => {
			Object.assign(query, pagination)
		}

		const items = computed(() => data?.value?.items || [])
		const totalProduct = computed(() => data?.value?.totalCount || 0)

		return {
			query,
			items,
			totalProduct,
			pending,
			error,
			refresh,
			execute,
			updatePage,
		}
	}
)
