import { date, number, object, string } from 'yup'
import { ShippingMethod } from '~/constants'

export type VoucherDiscount = {
	maxDiscount?: number
	freeShip?: boolean
	percentage?: number
	decrease?: number
	salePrice?: number
	offerAny?: number
	offerTarget?: Array<{
		ids?: string[]
		options?: string[]
		buyAndGet?: string
		quantity?: number
		salePrice: number
	}>
}

export type VoucherCondition = {
	minQuantity?: number
	minPrice?: number
	shippingMethod?: ShippingMethod
	inclusion?: Array<{
		ids?: string[]
		options?: string[]
		quantity?: number
		required: boolean
	}>
}

export type VoucherDetailModel = {
	id: string
	title: string
	image: string
	code: string
	partner?: string
	description: string
	expireHour: number
	activeStartTime: Date | number
	activeFinishTime?: Date | number
	discount: VoucherDiscount
	condition: VoucherCondition
	slider?: string
	disabled: boolean
	createdAt: Date
	updatedAt: Date
}

export type EditVoucherInfoModel = Pick<
	VoucherDetailModel,
	| 'image'
	| 'title'
	| 'code'
	| 'description'
	| 'expireHour'
	| 'activeStartTime'
	| 'activeFinishTime'
	| 'partner'
>

export const editVoucherInfoSchema = object<EditVoucherInfoModel>({
	title: string().min(3).required(),
	code: string().min(3).required(),
	description: string(),
	expireHour: number().positive().required(),
	activeStartTime: date().required(),
	activeFinishTime: date().optional(),
	partner: string().nullable().optional(),
})
