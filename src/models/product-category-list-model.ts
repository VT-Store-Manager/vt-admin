import { object, string, array, mixed } from 'yup'
import { Status } from '~/constants'

export interface ProductCategoryListItemModel {
	id: string
	code: number
	name: string
	image: string
	status: Status
	amountOfProduct: number
	totalSold: number
	soldOfWeek: number
	order: number
	featured: boolean
	updatedAt: number
}

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
