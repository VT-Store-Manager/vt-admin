export interface ProductCategoryModel {
	id: string
	image: string
	name: string
	status: 'active' | 'inactive' | 'removed'
	amountOfProduct?: number
	totalSold?: number
	soldOfWeek?: number
	order: number
}
