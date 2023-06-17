import { Status } from '~/constants'

export interface VoucherListItem {
	id: string
	code: string
	image: string
	name: string
	partner: {
		id: string
		name: string
		code: string
		image: string
	} | null
	startTime: number
	finishTime?: number
	publishStatus: number
	updatedAt: number
	status: Status
}

export interface VoucherListPaginationModel {
	maxCount: number
	items: VoucherListItem[]
}

export const useVoucherList = definePiniaStore('voucher-list', () => {
	const { pagination, updatePage, pushPaginationQuery } = usePagination()
	const query = computed(() => ({ ...pagination }))
	const resetQuery = () => updatePage()
	const pushQuery = () => {
		pushPaginationQuery()
	}

	const { data, pending, error, refresh } =
		useRequest<VoucherListPaginationModel>('/v1/admin/voucher/list', {
			query,
			transform: input => input.data,
			watch: [query],
		})

	const items = computed(() => data?.value?.items || [])
	const totalCount = computed(() => data?.value?.maxCount || 0)

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
	}
})
