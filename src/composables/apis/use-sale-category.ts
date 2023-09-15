import orderBy from 'lodash/orderBy'
import { SaleItemModel } from '~/models'
import { RangeTimeType } from '~/constants'

export const useSaleCategory = definePiniaStore('sale-category', () => {
	const timePeriod = ref<RangeTimeType>(RangeTimeType.QUARTER)
	const query = computed(() => ({
		timePeriod: timePeriod.value,
	}))

	const { data, pending, error, refresh } = useRequest<SaleItemModel[]>(
		'/statistic/category-sale',
		{
			query,
			transform: input => input.data,
			watch: [timePeriod],
		}
	)

	const sortBySaleData = computed(() => {
		if (!data.value) return []
		return orderBy(data.value, ['saleVolume'], ['desc'])
	})

	return { pending, error, refresh, data, sortBySaleData }
})
