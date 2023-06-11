import { Gender } from '~/constants'
import { DataResponse, Pagination } from '~/types'

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
	const pagination = reactive({
		page: 1,
		limit: 10,
	})
	const { data, pending, error, refresh } = useRequest<
		DataResponse<MemberListPaginationDTO>,
		MemberListPaginationDTO
	>('/v1/admin/member/list', {
		method: 'GET',
		query: {
			...pagination,
		},
		transform: input => input.data,
		watch: [pagination],
	})

	const updatePage = (_pagination: Pagination) => {
		Object.assign(pagination, _pagination)
	}

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
