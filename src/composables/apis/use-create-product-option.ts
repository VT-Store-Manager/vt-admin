import {
	CreateNewProductOptionModel,
	CreateProductSubOptionModel
} from '~/models/product/create-product-option'
import { ProductOptionModel } from '~/models/product/product-option'
import { BaseResponse } from '~/types'

export const useCreateProductOption = definePiniaStore(
	'create-product-option',
	() => {
		const { response, error, loading, fetch } = useRequest<
			BaseResponse<ProductOptionModel>,
			CreateNewProductOptionModel | CreateProductSubOptionModel
		>('/product-option/create', {
			method: 'POST'
		})

		return { response, error, loading, fetch }
	}
)
