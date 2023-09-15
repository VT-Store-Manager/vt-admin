export interface ShortMemberData {
	id: string
	name: string
	point: number
}

export interface StatisticMemberRankModel {
	id: string
	name: string
	color: string
	minPoint: number
	members: ShortMemberData[]
}
