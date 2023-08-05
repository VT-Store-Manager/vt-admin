export type StatisticAmountItemModel = {
	totalCount: number
	thisTime: number
	previousTime: number
}

export type StatisticAmountModel<T = StatisticAmountItemModel> = {
	member: T
	order: T
	revenue: T
	sale: T
}
