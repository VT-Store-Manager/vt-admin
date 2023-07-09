import { ProductOptionListItemModel } from '~/models/product-option-list-model'
import { PaginationDataModel } from '~/models'

export const useProductOptionList = definePiniaStore(
	'product-option-list',
	() => {
		const { pagination, updatePage, pushPaginationQuery } = usePagination()
		const query = computed(() => ({ ...pagination }))
		const resetQuery = () => updatePage()
		const pushQuery = () => {
			pushPaginationQuery()
		}

		const { data, pending, error, refresh } = useRequest<
			PaginationDataModel<ProductOptionListItemModel>
		>('/v1/admin/product-option/list', {
			query,
			transform: input => input.data,
			watch: [query],
		})

		const items = computed(() => data?.value?.items || [])
		const totalCount = computed(() => data?.value?.totalCount || 0)

		const optionMap = computed(() => {
			return new Map(items.value.map(item => [item.id, item]))
		})

		const parentOptions = computed(() => {
			return items.value.filter(item => !item.parent)
		})

		const subOptionMap = computed(() => {
			return new Map(
				parentOptions.value.map(option => [
					option.id,
					items.value.filter(sub => sub.parent === option.id),
				])
			)
		})

		return {
			pagination,
			items,
			totalCount,
			pending,
			error,
			optionMap,
			parentOptions,
			subOptionMap,
			refresh,
			updatePage,
			resetQuery,
			pushQuery,
		}
	}
)
