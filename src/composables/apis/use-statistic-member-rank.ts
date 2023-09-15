import { StatisticMemberRankModel } from '~/models'

export const useStatisticMemberRank = definePiniaStore(
	'statistic-member-rank',
	() => {
		const { data, pending, error, refresh } = useRequest<
			StatisticMemberRankModel[]
		>('/statistic/rank-data', {
			transform: input => input.data,
		})

		return { data, pending, error, refresh }
	}
)
