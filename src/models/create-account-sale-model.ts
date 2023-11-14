import { object, string } from 'yup'
import { UpdatedByModel } from './account-admin-model'

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
	username: string().matches(/^[a-zA-Z0-9_.-]{3,}$/),
	storeId: string().matches(/^[a-f\d]{24}$/i),
})
