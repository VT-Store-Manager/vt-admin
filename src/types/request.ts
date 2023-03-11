export type NoContentResponse = {
	code: number
	message: string
}

export type DataResponse<T extends Record<string, unknown>> = {
	code: number
	data: T
}

export type BaseResponse<T extends Record<string, unknown>> =
	NoContentResponse & DataResponse<T>
