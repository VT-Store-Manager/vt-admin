import { PaginationDataModel, ShipperListItemModel } from '~/models'

export const useShipperList = definePiniaStore('shipper-list', () => {
	const { pagination, updatePage, pushPaginationQuery } = usePagination()
	const query = computed(() => ({ ...pagination }))
	const resetQuery = () => updatePage()
	const pushQuery = () => {
		pushPaginationQuery()
	}

	const { data, pending, error, refresh } = useRequest<
		PaginationDataModel<ShipperListItemModel>
	>('/shipper/list', {
		query,
		transform: input => input.data,
		watch: [pagination],
	})

	const storedData = ref<PaginationDataModel<ShipperListItemModel>>(
		data.value || { totalCount: 0, items: [] }
	)

	watch(data, () => {
		if (data.value) storedData.value = data.value
	})

	const items = computed(() => {
		return storedData.value?.items || []
	})
	const totalShipper = computed(() => storedData.value?.totalCount || 0)

	return {
		pagination,
		items,
		totalShipper,
		data,
		pending,
		error,
		refresh,
		updatePage,
		resetQuery,
		pushQuery,
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useShipperList as any, import.meta.hot)
	)
}
