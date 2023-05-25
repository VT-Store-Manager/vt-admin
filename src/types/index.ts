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
