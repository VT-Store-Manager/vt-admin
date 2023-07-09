import { OrderState, PaymentType, ShippingMethod } from '~/constants'

export type OrderHistoryReceiverModel = {
	phone: string
	name: string
	address: string
}

export type OrderHistoryVoucherModel = {
	id: string
	discount: number
	name: string
}

export type OrderHistoryProductItemModel = {
	id: string
	name: string
	cost: number
	amount: number
	note: string
	options: string[]
}

export type OrderHistoryReview = {
	rate: number
	review: string
}

export type OrderHistoryStore = {
	id: string
	name: string
	address: string
}

export type OrderHistoryMember = {
	id: string
	name: string
	phone: string
	rankName: string
}

export type OrderHistoryItem = {
	id: string
	code: string
	name: string
	categoryId: ShippingMethod
	fee: number
	originalFee: number
	cost: number
	payType: PaymentType
	time: number
	store: OrderHistoryStore
	member?: OrderHistoryMember
	receiver?: OrderHistoryReceiverModel
	voucher?: OrderHistoryVoucherModel
	products: OrderHistoryProductItemModel[]
	review?: OrderHistoryReview
	point: number
	status: OrderState
}
