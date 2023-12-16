import { object, string } from 'yup'

export interface StoreListItemModel {
	name: string
	images: string[]
	address: {
		street: string
		ward: string
		district: string
		city: string
		country: string
	}
	openedStatus: boolean
	phone: string
	disabled: boolean
	deleted: boolean
	updatedAt: string
	id: string
}

export type CreateStoreModel = {
	images: File[]
	name: string
	openTime: {
		start: string
		end: string
	}
	address: {
		street: string
		ward?: string
		district: string
		city: string
		country: string
	}
	unavailableGoods: {
		product: string[]
		category: string[]
		option: string[]
	}
}

export const openTimePattern = /^([01]?\d|2[0-3]):[0-5]?\d$/

export type UpdateStoreInfoModel = {
	name: string
	openTime: {
		start: string
		end: string
	}
	street: string
	ward?: string
	district: string
	city: string
	country: string
}

export const createStoreSchema = object<UpdateStoreInfoModel>({
	name: string().min(2).required(),
	openTime: object<CreateStoreModel['openTime']>().shape({
		start: string()
			.matches(openTimePattern, 'Invalid open time format (HH:MM)')
			.required('Open time is required'),
		end: string()
			.matches(openTimePattern, 'Invalid close time format (HH:MM)')
			.required('Close time is required'),
	}),
	street: string().min(3).required(),
	ward: string().min(3),
	district: string().min(3).required(),
	city: string().min(3).required(),
	country: string().min(3).required(),
})

// STORE DETAIL MODEL

export interface UnavailableProduct {
	name: string
	category: string
	disabled: boolean
	deleted: boolean
	id: string
	image: string
}

export interface UnavailableGoods {
	product: string[]
	category: string[]
	option: string[]
}

export interface StoreDetailModel {
	code: number
	name: string
	images: string[]
	openTime: {
		start: string
		end: string
	}
	address: {
		street: string
		ward: string
		district: string
		city: string
		country: string
	}
	openedStatus: boolean
	disabled: boolean
	deleted: boolean
	createdAt: string
	updatedAt: string
	unavailableGoods: UnavailableGoods
	lat: number
	lng: number
	phone: string
	id: string
}

export interface UpdateStoreImagesModel {
	files: File[]
	imageMap: string[]
}
