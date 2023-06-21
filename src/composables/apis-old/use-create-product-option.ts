import {
	CreateNewProductOptionModel,
	CreateProductSubOptionModel,
} from '~/models_old/product/create-product-option'
import { ProductOptionModel } from '~/models_old/product/product-option'
import { BaseResponse } from '~/types'

export const useCreateProductOption = definePiniaStore(
	'create-product-option',
	() => {
		const { response, error, loading, fetch } = useRequest<
			BaseResponse<ProductOptionModel>,
			CreateNewProductOptionModel | CreateProductSubOptionModel
		>('/v1/admin/product-option/create', {
			method: 'POST',
		})

		return { response, error, loading, fetch }
	}
)
