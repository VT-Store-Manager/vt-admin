export interface StoreDailyTime {
	open: {
		hour: number
		minute: number
	}
	close: {
		hour: number
		minute: number
	}
}
export interface StoreAddress {
	street: string
	ward: string
	district: string
	country: string
}
export interface StoreModel {
	id: string
	name: string
	images: string
	dailyTime: StoreDailyTime
	address: StoreAddress
	openedStatus: boolean
	deleted: boolean
	updatedAt: string
	createdAt: string
	unavailableProducts: string[]
}
