import { RankListItemModel } from '~/models'

export const useRankList = definePiniaStore('rank-list', () => {
	const { data, pending, error, refresh } = useRequest<RankListItemModel[]>(
		'/v1/admin/rank',
		{ transform: input => input.data }
	)

	const items = computed(() => data.value || [])
	const totalCount = computed(() => data.value?.length || 0)

	return { data, pending, error, refresh, items, totalCount }
})
