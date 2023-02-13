export interface ProductCategoryModel {
	code: string
	image: string
	name: string
	status: 'active' | 'inactive' | 'removed'
	amount?: number
	sold?: number
	order: number
}
