import { AccountSaleListItem, PaginationDataModel } from '~/models'

export const useAccountSaleList = definePiniaStore('account-sale-list', () => {
	const { pagination, updatePage, pushPaginationQuery } = usePagination()
	const query = computed(() => ({ ...pagination }))
	const resetQuery = () => updatePage()
	const pushQuery = () => {
		pushPaginationQuery()
	}

	const { data, pending, error, refresh } = useRequest<
		PaginationDataModel<AccountSaleListItem>
	>('/account-sale/list', {
		query,
		transform: input => input.data,
		watch: [pagination],
	})

	const storedData = ref<PaginationDataModel<AccountSaleListItem>>(
		data.value || { totalCount: 0, items: [] }
	)

	watch(data, () => {
		if (data.value) storedData.value = data.value
	})

	const items = computed(() => {
		return storedData.value?.items || []
	})
	const totalAccount = computed(() => storedData.value?.totalCount || 0)

	return {
		pagination,
		items,
		totalAccount,
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
		acceptHMRUpdate(useAccountSaleList as any, import.meta.hot)
	)
}
