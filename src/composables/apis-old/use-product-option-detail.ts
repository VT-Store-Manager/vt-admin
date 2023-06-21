import { ProductOptionDetailModel } from '~/models_old/product/product-option'
import { BaseResponse } from '~/types'

export const useProductOptionDetail = definePiniaStore(
	'product-option-detail',
	() => {
		const {
			response,
			loading,
			error,
			fetchGet: fetch,
		} = useRequest<BaseResponse<ProductOptionDetailModel>>(
			'/public/option-detail.json'
		)

		return { response, loading, error, fetch }
	}
)
