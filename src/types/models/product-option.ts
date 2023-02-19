export interface ProductOptionItem {
	key?: string
	name: string
	cost: number
}

export interface ProductOptionModel {
	id: string
	name: string
	parent?: string
	maxSelect: number
	required: boolean
	items: ProductOptionItem[]
	applying?: string[]
}
