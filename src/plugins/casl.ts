import isEmpty from 'lodash/isEmpty'
import { MongoAbility, MongoQuery } from '@casl/ability'
import { abilitiesPlugin, Can, useAbility } from '@casl/vue'
import { Action, ActionType } from '~/constants'
import { AppAbility as _AppAbilityType, Subjects } from '~/models/casl-model'

export default defineNuxtPlugin(({ vueApp }) => {
	const abilityStore = storeToRefs(useAdminAbility())

	const loadAbility = () => {
		if (isEmpty(abilityStore.abilityList.value.permissions)) return
		vueApp
			.use(abilitiesPlugin, abilityStore.caslAbility.value, {
				useGlobalProperties: true,
			})
			.component(Can.name, Can)
	}

	watch(abilityStore.abilityList, () => {
		loadAbility()
	})

	loadAbility()

	return {
		provide: {
			getAbility: () => {
				return useAbility<
					MongoAbility<[Action | ActionType, Subjects], MongoQuery>
				>()
			},
		},
	}
})
