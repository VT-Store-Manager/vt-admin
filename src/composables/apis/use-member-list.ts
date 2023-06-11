import { Gender } from '~/constants'

export interface MemberRankItemDTO {
	name: string
	rank: number
	appearance: {
		icon: string
		background: string
		color: string
	}
}

export interface MemberItemModel {
	id: string
	name: string
	gender: keyof typeof Gender
	phone: string
	createdAt: number
	code: string
	rank: {
		code: string
		currentPoint: number
		usedPoint: number
		expiredPoint: number
		info: MemberRankItemDTO
	}
}

export interface MemberListPaginationDTO {
	maxCount: number
	items: MemberItemModel[]
}

export const useMemberList = definePiniaStore('member-list', () => {
	const { pagination, updatePage } = usePagination()

	const query = computed(() => ({ ...pagination }))

	const { data, pending, error, refresh } = useRequest<MemberListPaginationDTO>(
		'/v1/admin/member/list',
		{
			query,
			transform: input => input.data,
			watch: [query],
		},
		{
			pushQuery: true,
		}
	)

	const totalCount = computed(() => data.value?.maxCount || 0)
	const items = computed(() => data.value?.items || [])

	return {
		pagination,
		data,
		pending,
		error,
		refresh,
		updatePage,
		totalCount,
		items,
	}
})
