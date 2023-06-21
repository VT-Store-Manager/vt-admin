import { Gender } from '~/constants'

export interface MemberRankItemModel {
	name: string
	rank: number
	appearance: {
		icon: string
		background: string
		color: string
	}
}

export interface MemberListItemModel {
	id: string
	name: string
	gender: keyof typeof Gender
	phone: string
	createdAt: number
	code: string
	rank: {
		code: string
		currentPoint: number
		usedPoint: number
		expiredPoint: number
		info: MemberRankItemModel
	}
}
