export type DataResponse<T = Record<string, unknown>> = {
	statusCode: number
	message: string
	success: boolean
	data: T
}
