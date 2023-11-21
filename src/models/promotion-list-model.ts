export interface PromotionVoucherModel {
	title: string
	disabled: boolean
	deleted: boolean
	id: string
	code: string
	images: string[]
	activeStartTime: number
	activeFinishTime?: any
}

export interface PromotionRankModel {
	name: string
	rank: number
	appearance: {
		icon: string
		color: string
		background: string
	}
}

export interface PromotionListItemModel {
	id: string
	image?: any
	voucher: PromotionVoucherModel
	cost: number
	isFeatured: boolean
	disabled: boolean
	deleted: boolean
	updatedAt: number
	startTime: number
	finishTime?: any
	ranks: PromotionRankModel[]
	members: any[]
}
