export interface ProductCategoryModel extends Record<string, unknown> {
	id: string
	name: string
	image: string
	status: 'active' | 'inactive' | 'removed'
	amountOfProduct?: number
	totalSold?: number
	soldOfWeek?: number
	order: number
}
