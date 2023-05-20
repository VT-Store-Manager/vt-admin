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

type ProductOptionShortInfo = {
	id: string
	code: number
	name: string
	disabled: boolean
	deleted: boolean
}

type ApplyingProductShortInfo = {
	id: string
	code: number
	name: string
	disabled: boolean
	deleted: boolean
}

export interface ProductOptionDetailModel {
	id: string
	code: number
	name: string
	parent?: ProductOptionShortInfo
	children?: ProductOptionShortInfo[]
	range: number[]
	items: ProductOptionItem[]
	disabled: boolean
	deleted?: boolean
	createdAt: string
	updatedAt: string
	deletedAt?: string
	applyingProducts: ApplyingProductShortInfo[]
	boughtAmount: number
}

export interface EditProductOptionModel {
	parent?: string
	name: string
	range: number[]
	parentItems: Array<{
		action: 'add' | 'update' | 'delete'
		changeChildren: boolean
		name: string
		cost: number
		disabled?: boolean
		key?: string
	}>
	childrenItems: Array<{
		action: 'add' | 'update' | 'delete'
		parentKey: string
		cost: number
		disabled: boolean
	}>
}
