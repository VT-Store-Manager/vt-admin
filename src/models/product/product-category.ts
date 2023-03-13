import { Status } from '~/constants'

export interface ProductCategoryModel extends Record<string, unknown> {
	id: string
	name: string
	image: string
	status: Status
	amountOfProduct?: number
	totalSold?: number
	soldOfWeek?: number
	order: number
}
