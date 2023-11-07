import { MongoAbility, MongoQuery } from '@casl/ability'
import { abilitiesPlugin, Can, useAbility } from '@casl/vue'
import { Action, ActionType } from '~/constants'
import { AppAbility as _AppAbilityType, Subjects } from '~/models/casl-model'

export default defineNuxtPlugin(({ vueApp }) => {
	const ability = useAdminAbility().caslAbility
	vueApp
		.use(abilitiesPlugin, ability, { useGlobalProperties: true })
		.component(Can.name, Can)

	const { can } =
		useAbility<MongoAbility<[Action | ActionType, Subjects], MongoQuery>>()

	return {
		provide: { can },
	}
})
