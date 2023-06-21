import { Status } from '~/constants'

export interface ProductListItemModel {
	code: number
	name: string
	images: string[]
	originalPrice: number
	category: {
		id: string
		name: string
		code: number
	}
	updatedAt: string
	id: string
	status: Status
	salesVolume: {
		month: number
	}
}
