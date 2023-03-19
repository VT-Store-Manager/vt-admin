import { ProductModel } from '~/models/product'

import { BaseResponse } from '~/types'

export const useProduct = definePiniaStore('product', () => {
	const {
		response,
		error,
		loading,
		fetchGet: fetch
	} = useRequest<BaseResponse<ProductModel[]>>('/product')

	return { response, error, loading, fetch }
})
