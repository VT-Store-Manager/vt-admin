import { StatisticProductAmount } from '~/models'

export const useStatisticMemberAmount = definePiniaStore(
	'statistic-member-amount',
	() => {
		const duration = ref(30)
		const query = computed(() => ({ duration: duration.value }))
		const { data, pending, error, refresh } =
			useRequest<StatisticProductAmount>('/statistic/member-amount', {
				query,
				transform: input => input.data,
				watch: [duration],
			})

		return { data, pending, error, refresh, duration }
	}
)
