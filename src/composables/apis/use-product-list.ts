import { Pagination } from '~/types'
import { DataResponse } from '~/types/request'

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
	const query = reactive({
		page: 1,
		limit: 10,
	})
	const { data, pending, error, refresh, execute } = useRequest<
		DataResponse<ProductListPagination>,
		ProductListPagination
	>('/v1/admin/product/list', {
		method: 'GET',
		query,
		transform(input) {
			return input.data
		},
		watch: [query],
	})

	const updatePage = (pagination: Pagination) => {
		Object.assign(query, pagination)
	}

	const items = computed(() => data?.value?.items || [])
	const totalProduct = computed(() => data?.value?.totalCount || 0)

	return {
		query,
		items,
		totalProduct,
		data,
		pending,
		error,
		refresh,
		execute,
		updatePage,
	}
})
