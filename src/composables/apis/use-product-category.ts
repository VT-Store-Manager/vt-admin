import { ProductCategoryModel } from '~/types/models/product-category'

export const useProductCategory = definePiniaStore('product-category', () => {
	const {
		response: data,
		error,
		loading,
		fetchGet: fetch
	} = useRequest<ProductCategoryModel[]>('/product-category.json')

	return { data, error, loading, fetch }
})
