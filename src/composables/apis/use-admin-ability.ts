import { defineAbility } from '@casl/ability'
import { Action, AdminFeature } from '~/constants'
import { Store, Order } from '~/models/casl-model'

type ResponseData = {
	id: string
	stores: string[]
	permissions: Record<AdminFeature, Action[]>
}

export const useAdminAbility = definePiniaStore('admin-ability', () => {
	const { data, pending, error, execute, status } = useRequest<ResponseData>(
		'/account-admin/ability',
		{
			transform: input => input.data,
		}
	)

	const abilityList = computed<ResponseData>(() => {
		return (
			data.value ||
			({
				id: '',
				stores: [],
				permissions: {},
			} as any)
		)
	})

	const caslAbility = computed(() => {
		return defineAbility((can, cannot) => {
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
	})

	return { abilityList, caslAbility, pending, error, execute, status }
})
