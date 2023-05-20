import { BaseResponse } from '~/types/request'
import { ProductCategoryModel } from '~/models/product/product-category'

type CreateProductCategoryDto = {
	name: string
	file: File
}
export const useCreateProductCategory = definePiniaStore(
	'create-product-category',
	() => {
		const {
			response: data,
			error,
			loading,
			fetch
		} = useRequest<
			BaseResponse<ProductCategoryModel>,
			CreateProductCategoryDto
		>('/v1/admin/product-category/create', {
			method: 'POST'
		})

		return { data, error, loading, fetch }
	}
)
