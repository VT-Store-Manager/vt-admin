export interface ProductOptionItem {
	key: string
	name: string
	cost: number
	disabled: boolean
}

export interface ProductOptionModel {
	id: string
	code: number
	name: string
	parent?: string
	range: number[]
	items: ProductOptionItem[]
	deleted?: boolean
}

export interface ProductOptionListItemModel {
	id: string
	code: number
	name: string
	parent: string
	items: ProductOptionItem[]
	range: number[]
	used: number
	status: 'active' | 'disabled' | 'removed'
}
