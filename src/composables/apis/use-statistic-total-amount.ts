import { StatisticAmountModel, StatisticAmountItemModel } from '~/models'

export const useStatisticTotalAmount = definePiniaStore(
	'statistic-total-amount',
	() => {
		const duration = ref(30)
		const query = computed(() => ({ duration: duration.value }))
		const {
			data: _data,
			pending,
			error,
			refresh,
		} = useRequest<StatisticAmountModel>('/statistic/total-amount', {
			query,
			transform: input => input.data,
			watch: [duration],
		})

		const data = computed(() => {
			if (_data.value) {
				return Object.keys(_data.value).reduce((res, key) => {
					const temp = (_data.value as any)[key] as StatisticAmountItemModel
					const changeAmount = temp.thisTime - temp.previousTime
					return {
						...res,
						[key as keyof StatisticAmountModel]: {
							...(_data.value as any)[key],
							changeAmount,
							changePercent:
								(changeAmount < 0 ? -1 : 1) *
								(temp.thisTime / (temp.totalCount - temp.thisTime)) *
								100,
						},
					}
				}, {}) as StatisticAmountModel<
					StatisticAmountItemModel & {
						changeAmount: number
						changePercent: number
					}
				>
			}

			const defaultAmount = {
				totalCount: 0,
				thisTime: 0,
				previousTime: 0,
				changeAmount: 0,
				changePercent: 0,
			}
			return {
				member: defaultAmount,
				order: defaultAmount,
				revenue: defaultAmount,
				sale: defaultAmount,
			}
		})
		return { data, pending, error, refresh, duration }
	}
)
