import { array, mixed, object, string } from 'yup'

export type CreateProductCategoryModel = {
	name: string
	image: File[] | File
}

export const createProductCategorySchema = object().shape({
	name: string().min(2).required(),
	image: array()
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
})
