import { Status } from '~/constants'

export interface ProductModel {
	id: string
	image?: string[]
	name: string
	originalPrice: number
	saleOfMonth?: number
	description: string
	options: string[]
	category: string
	updatedAt: string
	status: Status
}
