import { PublishStatus, Status } from '~/constants'

export type VoucherItemModel = {
	id: string
	name: string
	image: string
	code: string
	partner: {
		id: string
		name: string
		code: string
	}
	startTime: number
	finishTime?: number
	updatedAt: number
	publishStatus: PublishStatus
	status: Status
}

export type VoucherListModel = {
	maxCount: number
	items: VoucherItemModel[]
}
