export interface RankItemModel {
	id: string
	name: string
	rank: number
	appearance: {
		icon: string
		color: string
		background: string
	}
	minPoint: number
	coefficientPoint: number
	deliveryFee: number
	updatedAt: number
	memberNumber: number
}

export const useRankList = definePiniaStore('rank-list', () => {
	const { data, pending, error, refresh } = useRequest<RankItemModel[]>(
		'/v1/admin/rank',
		{ transform: input => input.data },
		{ pushQuery: true }
	)

	const items = computed(() => data.value || [])
	const totalCount = computed(() => data.value?.length || 0)

	return { data, pending, error, refresh, items, totalCount }
})
