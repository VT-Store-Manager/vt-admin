import { object, string } from 'yup'
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

export type CreateAccountSaleBody = {
	username: string
	storeId: string
}

export type NewAccountSale = {
	_id: string
	username: string
	store: string
	forceUpdatePassword: boolean
	updatedBy: UpdatedByModel
	createdAt?: Date
	updatedAt?: Date
}

export const createAccountSaleSchema = object({
	username: string().matches(usernamePattern),
	storeId: string().matches(objectIdPattern),
})
