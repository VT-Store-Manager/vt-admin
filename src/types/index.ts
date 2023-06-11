export * from './layout'

export type BaseResponse<T> = {
	data: T
}

export type Pagination = {
	page: number
	limit: number
}

export type VSelectModel = {
	title: string
	value: string
	disabled?: boolean
}

export type DataResponse<T = Record<string, unknown>> = {
	statusCode: number
	message: string
	success: boolean
	data: T
}

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
	calculate?: (value: any) => any
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
