import { Status } from '~/constants'

export interface VoucherListItemModel {
	id: string
	code: string
	image: string
	name: string
	partner: {
		id: string
		name: string
		code: string
		image: string
	} | null
	startTime: number
	finishTime?: number
	publishStatus: number
	updatedAt: number
	status: Status
}
