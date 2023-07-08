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
	options: {
		id: string
		name: string
		range: [number, number]
		items: number
		disabled: boolean
		deleted: boolean
	}
	updatedAt: string
	id: string
	status: Status
	salesVolume: {
		month: number
	}
}
