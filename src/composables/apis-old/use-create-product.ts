import { ProductModel } from '~/models_old/product'
import { BaseResponse } from '~/types'

export const useCreateProduct = definePiniaStore('create-product', () => {
	const { response, loading, error, fetch } = useRequest<
		BaseResponse<ProductModel>
	>('/v1/admin/product/create', {
		method: 'POST',
	})

	return { response, loading, error, fetch }
})
