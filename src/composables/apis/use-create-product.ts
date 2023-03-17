import { ProductModel } from '~/models/product'
import { BaseResponse } from '~/types'

export const useCreateProduct = definePiniaStore('create-product', () => {
	const { response, loading, error, fetch } = useRequest<
		BaseResponse<ProductModel>
	>('/product/create', {
		method: 'POST'
	})

	return { response, loading, error, fetch }
})
