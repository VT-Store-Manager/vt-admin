export interface StoreItemModel {
	name: string
	images: string[]
	address: {
		street: string
		ward: string
		district: string
		city: string
		country: string
	}
	openedStatus: boolean
	disabled: boolean
	deleted: boolean
	updatedAt: string
	id: string
}

export interface StoreListModel {
	maxCount: number
	items: StoreItemModel[]
}

export const useStoreList = definePiniaStore('store-list', () => {
	const { pagination, updatePage, pushPaginationQuery } = usePagination()
	const query = computed(() => ({ ...pagination }))
	const resetQuery = () => updatePage()
	const pushQuery = () => {
		pushPaginationQuery()
	}

	const { data, pending, error, refresh } = useRequest<StoreListModel>(
		'/v1/admin/store/list',
		{
			query,
			transform: input => input.data,
			watch: [query],
		}
	)

	const totalCount = computed(() => data.value?.maxCount || 0)
	const items = computed(() => data.value?.items || [])

	return {
		pagination,
		updatePage,
		data,
		pending,
		error,
		refresh,
		totalCount,
		items,
		resetQuery,
		pushQuery,
	}
})
