import { ProductCategoryModel } from '~/models/product/product-category'
import { BaseResponse, VSelectModel } from '~/types'

export const useProductCategory = definePiniaStore('product-category', () => {
	const {
		response,
		error,
		loading,
		fetchGet: fetch
	} = useRequest<BaseResponse<ProductCategoryModel[]>>('/product-category/list')

	const categorySelect = computed((): VSelectModel[] => {
		return (
			response.value?.data.map(
				(category): VSelectModel => ({
					title: category.name,
					value: category.id
				})
			) || []
		)
	})

	return { response, error, loading, fetch, categorySelect }
})
