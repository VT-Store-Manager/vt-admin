import { ProductCategorySelectModel } from '~/models'

export const useProductCategorySelect = definePiniaStore(
	'product-category-select',
	() => {
		const { data, pending, error, refresh } = useRequest<
			ProductCategorySelectModel[]
		>('/product-category/select-list', {
			transform: input => input.data,
		})

		return { data, pending, error, refresh }
	}
)
