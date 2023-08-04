import { StatisticOrderAmount } from '~/models'

export const useStatisticOrderAmount = definePiniaStore(
	'statistic-order-amount',
	() => {
		const duration = ref(30)
		const query = computed(() => ({ duration: duration.value }))
		const { data, pending, error, refresh } = useRequest<StatisticOrderAmount>(
			'/statistic/order-amount',
			{
				query,
				transform: input => input.data,
				watch: [duration],
			}
		)

		return { data, pending, error, refresh, duration }
	}
)
