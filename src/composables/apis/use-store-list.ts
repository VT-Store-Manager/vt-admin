import { PaginationDataModel, StoreListItemModel } from '~/models'

export const useStoreList = definePiniaStore('store-list', () => {
	const { pagination, updatePage, pushPaginationQuery } = usePagination()
	const query = computed(() => ({ ...pagination }))
	const resetQuery = () => updatePage()
	const pushQuery = () => {
		pushPaginationQuery()
	}

	const { data, pending, error, refresh } = useRequest<
		PaginationDataModel<StoreListItemModel>
	>('/store/list', {
		query,
		transform: input => input.data,
		watch: [query],
	})
	const storedData = ref<StoreListItemModel[]>([])
	watch(data, value => {
		if (value) {
			storedData.value = value.items
		}
	})

	const totalCount = computed(() => {
		if (storedData.value.length) return storedData.value.length
		return data.value?.items.length || 0
	})
	const items = computed(() => {
		if (storedData.value.length) return storedData.value
		return data.value?.items || []
	})
	const storeMap = computed(
		() => new Map(items.value.map(store => [store.id, store]))
	)
	const storeSelectData = computed(() => {
		return items.value.map(store => {
			return {
				title: store.name,
				value: store.id,
				image: store.images[0],
			}
		})
	})

	return {
		pagination,
		updatePage,
		storeMap,
		data,
		pending,
		error,
		refresh,
		totalCount,
		items,
		resetQuery,
		pushQuery,
		storeSelectData,
	}
})
