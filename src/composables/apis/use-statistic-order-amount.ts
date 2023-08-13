import { StatisticOrderAmountModel } from '~/models'

export const useStatisticOrderAmount = definePiniaStore(
	'statistic-order-amount',
	() => {
		const { data, pending, error, refresh } =
			useRequest<StatisticOrderAmountModel>('/statistic/order-data', {
				transform: input => input.data,
			})

		return { data, pending, error, refresh }
	}
)
