export interface OpenTime {
	start: string
	end: string
}
export interface StoreAddress {
	street: string
	ward: string
	district: string
	city: string
	country: string
}
export interface StoreModel {
	id: string
	code: number
	name: string
	images: string
	openTime: OpenTime
	address: StoreAddress
	openedStatus: boolean
	disabled: boolean
	deleted: boolean
	deletedAt?: string
	updatedAt: string
	createdAt: string
	unavailableGoods: {
		product: string[]
		category: string[]
		option: string[]
	}
}

export interface StoreGridItemModel
	extends Pick<
		StoreModel,
		| 'id'
		| 'images'
		| 'name'
		| 'address'
		| 'updatedAt'
		| 'openedStatus'
		| 'deleted'
	> {}

export interface CreateStoreModel
	extends Pick<
		StoreModel,
		'name' | 'openTime' | 'address' | 'unavailableGoods'
	> {}
