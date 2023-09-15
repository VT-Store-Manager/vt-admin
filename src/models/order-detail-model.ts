import { StoreCriterion } from '~/constants'

export interface OrderReview {
	rate: number
	content: string
	satisfied: StoreCriterion[]
	likeItems: string[]
	unlikeItems: string[]
}

export interface OrderItem {
	productId: string
	category: string
	options: string[]
	name: string
	quantity: number
	note: string
	unitPrice: number
	unitSalePrice: number
}

export interface ShortInfoStore {
	id: string
	name: string
	address: string
}

export interface OrderReceiver {
	name: string
	phone: string
	address: string
	timer: string
}

export interface ShortInfoVoucher {
	id: string
	title: string
	code: string
	discountPrice: number
}

export interface ShortInfoMember {
	id: string
	name: string
	phone: string
	rankName: string
	rankColor: string
}

export interface OrderDetailModel {
	member: ShortInfoMember
	voucher: ShortInfoVoucher
	point: number
	type: number
	buyer: string
	receiver: OrderReceiver
	store: ShortInfoStore
	items: OrderItem[]
	totalProductPrice: number
	deliveryPrice: number
	deliveryDiscount: number
	payment: number
	state: string
	code: string
	createdAt: string
	review: OrderReview
}
