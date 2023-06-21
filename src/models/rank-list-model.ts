export interface RankListItemModel {
	id: string
	name: string
	rank: number
	appearance: {
		icon: string
		color: string
		background: string
	}
	minPoint: number
	coefficientPoint: number
	deliveryFee: number
	updatedAt: number
	memberNumber: number
}
