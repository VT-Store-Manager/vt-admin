export type DataResponse<T = Record<string, unknown>> = {
	statusCode: number
	message?: string
	data: T
}

export type BooleanResponse = {
	statusCode: number
	success: boolean
	message?: string
}

export type ResponseType<T> = T extends Record<any, any>
	? DataResponse<T>
	: T extends boolean
	? BooleanResponse
	: never

export type ErrorType = {
	statusCode: number
	error?: string
	message: string
}
