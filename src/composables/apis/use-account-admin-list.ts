import { AccountAdminListItem } from '~/models'

export const useAccountAdminList = definePiniaStore(
	'account-admin-list',
	() => {
		const { $faker } = useNuxtApp()
		const { data, pending, error, execute, refresh } = useRequest<
			AccountAdminListItem[]
		>('/account-admin/list', {
			transform: input => input.data,
		})
		const storedData = ref<AccountAdminListItem[]>([])

		watch(data, value => {
			if (value) {
				storedData.value = value
			}
		})

		const accountList = computed(() => {
			if (storedData.value.length === 0) {
				return (data.value || []).map(item => ({
					...item,
					avatar: item.avatar || $faker.image.avatar(),
				}))
			}
			return storedData.value.map(item => ({
				...item,
				avatar: item.avatar || $faker.image.avatar(),
			}))
		})

		const accountMap = computed(() => {
			const mapKeyList = [
				...accountList.value,
				...accountList.value.map(item => ({ ...item, id: item.username })),
			]
			return new Map(mapKeyList.map(item => [item.id, item]))
		})

		return { data, accountList, accountMap, pending, error, execute, refresh }
	}
)

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useAccountAdminList as any, import.meta.hot)
	)
}
