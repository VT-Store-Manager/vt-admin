import { UpdatedByModel } from './account-admin-model'

export interface AccountSaleStoreData {
	id: string
	name: string
	image: string
}

export interface AccountSaleListItem {
	id: string
	username: string
	store: AccountSaleStoreData
	updatedBy?: UpdatedByModel
	createdAt: Date
	updatedAt: Date
}
