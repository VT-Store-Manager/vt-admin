import { Status } from '~/constants'

export interface ProductModel {
	id: string
	code: number
	images?: string[]
	name: string
	originalPrice: number
	salesVolumn: {
		month: number
	}
	description: string
	options: string[]
	category: {
		id: string
		code: number
		name: string
	}
	updatedAt: string
	status: Status
}
