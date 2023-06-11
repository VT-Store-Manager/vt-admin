import { DataResponse } from '~/types'

export interface VoucherListItem {
	code: string
	image: string
	id: string
	name: string
	partner?: any
	startTime: number
	finishTime?: any
	publishStatus: number
	updatedAt: number
	status: string
}

export interface VoucherListPaginationModel {
	maxCount: number
	items: VoucherListItem[]
}

export const useVoucherList = definePiniaStore('voucher-list', () => {
	const query = reactive({
		page: 1,
		limit: 10,
	})
	const { data, pending, error, refresh } = useRequest<
		DataResponse<VoucherListPaginationModel>,
		VoucherListPaginationModel
	>('/v1/admin/voucher/list', {
		method: 'GET',
		query,
		transform: input => input.data,
		watch: [query],
	})

	const updatePage = (pagination: { page: number; limit: number }) => {
		Object.assign(query, pagination)
	}

	const items = computed(() => data?.value?.items || [])
	const totalCount = computed(() => data?.value?.maxCount || 0)

	return {
		query,
		items,
		totalCount,
		data,
		pending,
		error,
		refresh,
		updatePage,
	}
})
