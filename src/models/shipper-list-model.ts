import { object, string, array, ValidationError, number, date } from 'yup'
import { UpdatedByModel } from './account-admin-model'
import { Gender } from '~/constants'

export type ShipperListItemModel = {
	id: string
	phone: string
	name: string
	avatar: string
	gender: typeof Gender
	dob: Date
	updatedBy?: UpdatedByModel
	createdAt: Date
	updatedAt: Date
}

export type CreateShipperModel = {
	phone: string
	name: string
	avatar: File | File[]
	gender: keyof typeof Gender
	dob: number
}

export type CreateShipperResult = {
	_id: string
	phone: string
	name: string
	avatar: string
	gender: keyof typeof Gender
	dob: Date
}

export const createShipperSchema = object({
	phone: string()
		.matches(viPhoneNumberPattern, {
			message: 'Phone number is invalid',
		})
		.required(),
	name: string().min(3).required(),
	avatar: array<File[]>()
		.min(1, 'Avatar is required')
		.test('fileSize', 'Max size must be <= 2Mb', (value?: File | File[]) => {
			const file = Array.isArray(value) ? value[0] : value
			if (!file || !(file instanceof File))
				return new ValidationError('Avatar is required')
			return file.size <= 1024 * 1024 * 2
		})
		.required(),
	gender: number()
		.test('gender', 'Gender is invalid', (value?: number) => {
			return !!(typeof value === 'number' && Gender[value])
		})
		.required(),
	dob: date().required(),
})
