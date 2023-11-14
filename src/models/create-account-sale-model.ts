import { object, string } from 'yup'

export type CreateAccountSaleBody = {
	username: string
	storeId: string
}

export const createAccountSaleSchema = object({
	username: string().matches(/^[a-zA-Z0-9_.-]{3,}$/),
	storeId: string().matches(/^[a-f\d]{24}$/i),
})
