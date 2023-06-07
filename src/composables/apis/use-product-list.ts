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

export const useProductList = definePiniaStore('product-list', () => {
	const { data, pending, error, refresh, execute } = useRequest<
		DataResponse<Array<ProductListItem>>,
		Array<ProductListItem>
	>('/v1/admin/product', {
		method: 'GET',
		transform(input) {
			return input.data
		},
	})

	return { data, pending, error, refresh, execute }
})
