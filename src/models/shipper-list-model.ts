import { UpdatedByModel } from './account-admin-model'
import { Gender } from '~/constants'

export type ShipperListItemModel = {
	id: string
	phone: string
	name: string
	avatar: string
	gender: typeof Gender
	dob: Date
	updatedBy?: UpdatedByModel
	createdAt: Date
	updatedAt: Date
}
