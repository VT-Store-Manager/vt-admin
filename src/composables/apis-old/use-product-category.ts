import { ProductCategoryModel } from '~/models_old/product/product-category'
import { BaseResponse, VSelectModel } from '~/types'

export const useProductCategory = definePiniaStore('product-category', () => {
	const {
		response,
		error,
		loading,
		fetchGet: fetch,
	} = useRequest<BaseResponse<ProductCategoryModel[]>>(
		'/v1/admin/product-category/list'
	)

	const categorySelect = computed((): VSelectModel[] => {
		return (
			response.value?.data.map(
				(category): VSelectModel => ({
					title: category.name,
					value: category.id,
				})
			) || []
		)
	})

	const dataLen = computed(() => response.value?.data.length || 0)

	return { response, error, loading, fetch, categorySelect, dataLen }
})
