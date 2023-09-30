import { Action, AdminFeature } from '~/constants'

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

	return { abilityList, pending, error, execute, status }
})
