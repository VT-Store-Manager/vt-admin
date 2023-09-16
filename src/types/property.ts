export type Nav = {
	name: string
	icon?: string
	url?: string
}

export type SubNavItem = {
	name: string
	icon?: string
	url: string
	sidebar?: boolean
	disabled?: boolean
}

export type NavItem = {
	name: string
	icon?: string
	url: string
	sidebar?: boolean
	disabled?: boolean
	sub?: SubNavItem[]
}

export type ListDisplay = 'list' | 'grid'

export type Alignment =
	| 'left'
	| 'right'
	| 'center'
	| 'justify'
	| 'start'
	| 'end'

export type TableHeader<T> = {
	title: string
	key: string
	calculate?: (value: any, item: T) => any
	sortable?: boolean
	default?: string | number | Date
	alignCol?: Alignment
	centerHead?: boolean
	offset?: number
	width?: number | string
	maxWidth?: number | string
	minWidth?: number | string
	sort?: (a: T, b: T) => number
}
