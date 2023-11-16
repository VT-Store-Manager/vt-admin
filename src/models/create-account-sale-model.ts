import { object, string } from 'yup'
import { UpdatedByModel } from './account-admin-model'
import { objectIdPattern, usernamePattern } from '~/constants'

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
