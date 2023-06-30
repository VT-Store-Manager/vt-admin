import { array, mixed, number, object, string } from 'yup'

export type CreateProductModel = {
	name: string
	images: File[]
	category: string
	originalPrice: number
	description: string
	options: string[]
}

export const createProductSchema = object({
	name: string().min(2).required(),
	images: array()
		.of(
			mixed<File>().test(
				'fileSize',
				'Max size must be <= 2Mb',
				(value?: File) => {
					return value!.size <= 1024 * 1024 * 2
				}
			)
		)
		.min(1, 'At least 1 images')
		.required()
		.default(() => []),
	category: string().required(),
	originalPrice: number()
		.transform(v => +v)
		.positive()
		.required(),
	description: string().default(''),
	options: array()
		.of(string().min(1))
		.required()
		.default(() => []),
})
