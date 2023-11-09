import isEmpty from 'lodash/isEmpty'
import { RouteLocationNormalized } from '#vue-router'
import { AdminFeature } from '~/constants'

export default defineNuxtRouteMiddleware(async (to, from) => {
	const subject: AdminFeature | undefined =
		getPageSubject(to) || (to.meta.subject as any)

	if (!subject && to.name !== 'index') return

	let accessible = false
	const abilityStore = useAdminAbility()
	if (isEmpty(abilityStore.abilityList.permissions)) {
		await abilityStore.execute()
		if (abilityStore.error) return abortNavigation()
	}
	const ability = abilityStore.caslAbility

	if (to.name === 'index') {
		accessible = Object.values(AdminFeature).some(subject => {
			return ability.can('analyse', subject)
		})
	} else if (subject) {
		accessible = ability.can('read', subject)
	}
	if (!accessible) {
		return to.name === from.name ? navigateTo('/') : abortNavigation()
	}
})

const getPageSubject = (
	route: RouteLocationNormalized
): AdminFeature | undefined => {
	const routeName = route.name as string
	if (routeName.startsWith('product')) return AdminFeature.PRODUCT
	if (routeName.startsWith('store')) return AdminFeature.STORE
	if (routeName.startsWith('member')) return AdminFeature.MEMBER
	if (routeName.startsWith('voucher')) return AdminFeature.VOUCHER
	if (routeName.startsWith('order')) return AdminFeature.ORDER
	if (routeName.startsWith('account')) return AdminFeature.ACCOUNT
	if (routeName.startsWith('setting')) return AdminFeature.SETTING
	return undefined
}
