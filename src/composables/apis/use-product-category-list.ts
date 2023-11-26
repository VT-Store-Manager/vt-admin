import { ProductCategoryListItemModel, PaginationDataModel } from '~/models'

export const useProductCategoryList = definePiniaStore(
	'product-category-list',
	() => {
		const { data, pending, error, refresh } = useRequest<
			PaginationDataModel<ProductCategoryListItemModel>
		>('/product-category/list', {
			transform: input => input.data,
		})

		const items = computed(() => data?.value?.items || [])
		const totalCount = computed(() => data?.value?.totalCount || 0)

		const categoryMap = computed(() => {
			return new Map(items.value.map(item => [item.id, item]))
		})

		return {
			items,
			totalCount,
			categoryMap,
			pending,
			error,
			refresh,
		}
	}
)
