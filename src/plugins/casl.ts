import { MongoAbility, MongoQuery, defineAbility } from '@casl/ability'
import { abilitiesPlugin, Can, useAbility } from '@casl/vue'
import { AdminFeature, Action, ActionType } from '~/constants'
import {
	Order,
	Store,
	Subjects,
	AppAbility as _AppAbilityType,
} from '~/models/casl-model'
export default defineNuxtPlugin(({ vueApp }) => {
	const { abilityList } = storeToRefs(useAdminAbility())

	const ability = defineAbility((can, cannot) => {
		const featureNames = Object.keys(
			abilityList.value.permissions
		) as AdminFeature[]

		can(Object.values(Action), AdminFeature.COMMON)

		featureNames.forEach(feature => {
			const scopes = abilityList.value.permissions[feature]

			switch (feature) {
				case AdminFeature.STORE:
					scopes.forEach(scope => {
						if ([Action.MODIFY, Action.ANALYSE].includes(scope)) {
							if (abilityList.value.stores.length) {
								can(scope, Store, {
									id: { $in: abilityList.value.stores },
								})
							} else {
								can(scope, Store)
								can(scope, AdminFeature.STORE)
							}
						} else {
							can(scope, Store)
							can(scope, AdminFeature.STORE)
						}
					})
					break

				case AdminFeature.ORDER:
					scopes.forEach(scope => {
						if ([Action.MODIFY, Action.ANALYSE].includes(scope)) {
							if (abilityList.value.stores.length) {
								can(scope, Order, {
									storeId: { $in: abilityList.value.stores },
								})
							} else {
								can(scope, Order)
								can(scope, AdminFeature.ORDER)
							}
						} else {
							can(scope, Order)
							can(scope, AdminFeature.ORDER)
						}
					})
					break

				default:
					scopes.forEach(scope => {
						can(scope, feature)
					})
					break
			}
		})
	})

	vueApp
		.use(abilitiesPlugin, ability, { useGlobalProperties: true })
		.component(Can.name, Can)

	const { can } =
		useAbility<MongoAbility<[Action | ActionType, Subjects], MongoQuery>>()

	return {
		provide: { can },
	}
})
