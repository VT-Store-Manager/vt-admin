import orderBy from 'lodash/orderBy'
import { SaleProductRankingItemModel } from '~/models'
import { RangeTimeType } from '~/constants'

export const useSaleRanking = definePiniaStore('sale-ranking', () => {
	const timePeriod = ref<RangeTimeType>(RangeTimeType.QUARTER)
	const query = computed(() => ({
		timePeriod: timePeriod.value,
	}))

	const { data, pending, error, refresh } = useRequest<
		SaleProductRankingItemModel[]
	>('/statistic/sale-ranking', {
		query,
		transform: input => input.data,
		watch: [timePeriod],
	})

	const saleVolumeRankingList = computed(() => {
		if (!data.value) return []
		return data.value.slice(0, 5)
	})

	const profitRankingList = computed(() => {
		if (!data.value) return []
		return orderBy(data.value, ['profit'], ['desc']).slice(0, 5)
	})

	return { pending, error, refresh, saleVolumeRankingList, profitRankingList }
})
