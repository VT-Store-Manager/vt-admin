export type OrderCountItem = {
	id: string
	totalCount: number
	inStoreCount: number
	pickupCount: number
	deliveryCount: number
	memberOrderCount: number
	totalProfit: number
	totalDeliveryOrderProfit: number
}

export type StatisticOrderAmountModel = {
	year: Record<string, OrderCountItem>
	month: Record<string, OrderCountItem>
	day: Record<string, OrderCountItem>
}
