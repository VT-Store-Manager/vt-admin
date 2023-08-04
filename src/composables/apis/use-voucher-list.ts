import pick from 'lodash/pick'
import { Status } from '~/constants'
import { PaginationDataModel, VoucherListItemModel } from '~/models'

export const useVoucherList = definePiniaStore('voucher-list', () => {
	const { pagination, updatePage, pushPaginationQuery } = usePagination()
	const query = computed(() => ({ ...pagination }))
	const resetQuery = () => updatePage()
	const pushQuery = () => {
		pushPaginationQuery()
	}

	const { data, pending, error, refresh } = useRequest<
		PaginationDataModel<VoucherListItemModel>
	>('/voucher/list', {
		query,
		transform: input => input.data,
		watch: [query],
	})
	const now = useNow()

	const items = computed(() => data?.value?.items || [])
	const totalCount = computed(() => data?.value?.totalCount || 0)

	const selectItems = computed(() => {
		return items.value
			.filter(voucher => {
				return (
					voucher.status === Status.ACTIVE &&
					now.value.getTime() >= voucher.startTime &&
					(!voucher.finishTime || now.value.getTime() < voucher.finishTime)
				)
			})
			.map(voucher => {
				return pick(voucher, 'id', 'code', 'image', 'name')
			})
	})

	return {
		query,
		pagination,
		items,
		totalCount,
		data,
		pending,
		error,
		refresh,
		updatePage,
		pushQuery,
		resetQuery,
		selectItems,
	}
})
