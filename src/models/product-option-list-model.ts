import { Status } from '~/constants'

export type ProductOptionListItemModel = {
	id: string
	applying: number
	status: Status
	code: number
	name: string
	parent?: string
	range: Array<number>
	defaultSelect: string[]
	items: {
		key: string
		parentKey?: string
		name: string
		cost: number
		disabled: boolean
		isDefault?: boolean
	}[]
}
