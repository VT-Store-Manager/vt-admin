import { OrderHistoryItem } from './order-history-model'
import { RankListItemModel } from './rank-list-model'
import { NotificationType } from '~/constants'

export interface MemberRankModel {
	code: string
	rank: Pick<RankListItemModel, 'name' | 'appearance'> & {
		id: string
	}
	usedPoint: number
	expiredPoint: number
	currentPoint: number
}

export interface MemberVoucherModel {
	id: string
	voucher: {
		id: string
		title: string
		image: string
		code: string
		disabled: boolean
	}
	startTime: Date
	finishTime: Date
	createdAt: Date
}

export interface PromotionHistoryModel {
	title: string
	description: string
	image: string
	cost: number
	voucher: {
		title: string
		code: string
		image: string
		id: string
	}
	createdAt: Date
}

export interface MemberAddress {
	name?: string
	address: string
	building?: string
	gate?: string
	note?: string
	latLng?: [number, number]
	receiver: string
	phone: string
}

export interface MemberDataModel {
	favoriteProducts: string[]
	favoriteStores: string[]
	address: {
		main: MemberAddress[]
		other: MemberAddress[]
	}
	notifications: {
		name: string
		description: string
		image?: string
		targetId?: string
		checked?: boolean
		type: NotificationType
		createdAt?: Date
	}
}

export interface MemberDetailModel {
	id: string
	name: string
	phone: string
	gender: number
	dob: Date
	deleted: boolean
	createdAt: Date
	promotionHistories: PromotionHistoryModel[]
	memberData: MemberDataModel
	memberRank: MemberRankModel
	orders: Omit<OrderHistoryItem, 'member'>[]
	vouchers: MemberVoucherModel[]
}
