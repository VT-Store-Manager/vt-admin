export interface PromotionVoucherModel {
	title: string
	disabled: boolean
	deleted: boolean
	id: string
	images: string[]
	activeStartTime: number
	activeFinishTime?: any
}

export interface PromotionRankModel {
	name: string
	rank: number
	appearance: {
		icon: string
		color: string
		background: string
	}
}

export interface PromotionItemModel {
	id: string
	image?: any
	voucher: PromotionVoucherModel
	cost: number
	isFeatured: boolean
	disabled: boolean
	deleted: boolean
	updatedAt: number
	startTime: number
	finishTime?: any
	ranks: PromotionRankModel[]
	members: any[]
}

export interface PromotionListPaginationModel {
	maxCount: number
	items: PromotionItemModel[]
}

export const usePromotionList = definePiniaStore('promotion-list', () => {
	const { pagination, updatePage } = usePagination()

	const query = computed(() => ({ ...pagination }))
	const { data, pending, error, refresh } =
		useRequest<PromotionListPaginationModel>(
			'/v1/admin/promotion/list',
			{
				method: 'GET',
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
		data,
		pending,
		error,
		refresh,
		totalCount,
		items,
		updatePage,
	}
})
