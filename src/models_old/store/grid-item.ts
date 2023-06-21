import { StoreModel } from '.'

export interface StoreGridItemModel
	extends Pick<
		StoreModel,
		| 'id'
		| 'images'
		| 'name'
		| 'address'
		| 'updatedAt'
		| 'openedStatus'
		| 'deleted'
	> {}
