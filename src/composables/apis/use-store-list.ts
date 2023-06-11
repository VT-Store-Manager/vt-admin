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
	const { pagination, updatePage } = usePagination()

	const query = computed(() => ({ ...pagination }))
	const { data, pending, error, refresh } = useRequest<StoreListModel>(
		'/v1/admin/store/list',
		{
			query,
			transform: input => input.data,
			watch: [query],
		},
		{ pushQuery: true }
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
	}
})
