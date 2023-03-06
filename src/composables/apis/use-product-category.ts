import { ProductCategoryModel } from '~/models/product/product-category'
import { VSelectModel } from '~/types'

export const useProductCategory = definePiniaStore('product-category', () => {
	const {
		response: data,
		error,
		loading,
		fetchGet: fetch
	} = useRequest<ProductCategoryModel[]>('/product-category.json')

	const categorySelect = computed((): VSelectModel[] => {
		return (
			data.value?.map(
				(category): VSelectModel => ({
					title: category.name,
					value: category.id
				})
			) || []
		)
	})

	return { data, error, loading, fetch, categorySelect }
})
