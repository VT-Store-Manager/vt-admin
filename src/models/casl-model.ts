import {
	InferSubjects,
	AbilityBuilder,
	MongoAbility,
	MongoQuery,
} from '@casl/ability'
import { AdminFeature, Action, AdminFeatureType, ActionType } from '~/constants'

export class Store {
	id: string
	constructor(id: string) {
		this.id = id
	}
}

export class Order {
	storeId: string
	constructor(storeId: string) {
		this.storeId = storeId
	}
}

export type Subjects =
	| InferSubjects<typeof Store | typeof Order>
	| AdminFeature
	| AdminFeatureType
export type AppAbility = AbilityBuilder<
	MongoAbility<[Action | ActionType, Subjects], MongoQuery>
>
