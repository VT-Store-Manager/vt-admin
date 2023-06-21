import { array, mixed, number, object, string } from 'yup'

export type CreateProductModel = {
	name: string
	images: (File | Blob)[]
	category: string
	originalPrice: number
	description: string
	options: string[]
}

export const createProductSchema = object({
	name: string().min(2).required(),
	images: array()
		.of(
			mixed<File>().test('isFile', 'File type is required', value => {
				return value instanceof File
			})
		)
		.min(1, 'At least 1 images')
		.required()
		.default(() => []),
	category: string().required(),
	price: number()
		.transform(v => +v)
		.positive()
		.required(),
	description: string().default(''),
	options: array()
		.of(string().min(1))
		.required()
		.default(() => []),
})
