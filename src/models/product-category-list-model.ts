import { Status } from '~/constants'

export interface ProductCategoryListItemModel {
	id: string
	code: number
	name: string
	image: string
	status: Status
	amountOfProduct: number
	totalSold: number
	soldOfWeek: number
	order: number
	featured: boolean
	updatedAt: number
}
