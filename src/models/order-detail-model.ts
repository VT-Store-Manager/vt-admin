import { OrderState, StoreCriterion } from '~/constants'

export interface OrderReview {
	rate: number
	content: string
	satisfied: StoreCriterion[]
	likeItems: string[]
	dislikeItems: string[]
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

export interface OrderTimeLog {
	time: Date
	title: string
	description?: string
	state?: OrderState
}

export interface OrderShipper {
	id: string
	phone: string
	name: string
	review?: {
		rate: number
		content?: string
	}
}

export interface OrderEmployee {
	id: string
	phone: string
	name: string
	avatar: string
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
	timeLog?: OrderTimeLog[]
	shipper?: OrderShipper
	employee?: OrderEmployee
}
