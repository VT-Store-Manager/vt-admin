export interface ProductModel {
	id: string
	image?: Array<File>
	name: string
	originalPrice: number
	saleOfMonth?: number
	description: string
	options: string[]
	category: string
	updatedAt: string
	status: 'active' | 'inactive' | 'removed'
}
