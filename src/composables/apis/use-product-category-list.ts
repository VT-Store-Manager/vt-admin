import { ProductCategoryListItemModel, PaginationDataModel } from '~/models'

export const useProductCategoryList = definePiniaStore(
	'product-category-list',
	() => {
		const { pagination, updatePage, pushPaginationQuery } = usePagination()
		const query = computed(() => ({ ...pagination }))
		const resetQuery = () => updatePage()
		const pushQuery = () => {
			pushPaginationQuery()
		}

		const { data, pending, error, refresh } = useRequest<
			PaginationDataModel<ProductCategoryListItemModel>
		>('/product-category/list', {
			query,
			transform: input => input.data,
			watch: [query],
		})

		const items = computed(() => data?.value?.items || [])
		const totalProduct = computed(() => data?.value?.totalCount || 0)

		return {
			pagination,
			items,
			totalProduct,
			pending,
			error,
			refresh,
			updatePage,
			resetQuery,
			pushQuery,
		}
	}
)
