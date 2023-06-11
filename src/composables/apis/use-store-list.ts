import { BaseResponse, Pagination } from '~/types'

export interface StoreItemModel {
	name: string
	images: string[]
	address: {
		street: string
		ward: string
		district: string
		city: string
		country: string
	}
	openedStatus: boolean
	disabled: boolean
	deleted: boolean
	updatedAt: string
	id: string
}

export interface StoreListModel {
	maxCount: number
	items: StoreItemModel[]
}

export const useStoreList = definePiniaStore('store-list', () => {
	const pagination = reactive<Pagination>({
		page: 1,
		limit: 10,
	})
	const { data, pending, error, refresh } = useRequest<
		BaseResponse<StoreListModel>,
		StoreListModel
	>('/v1/admin/store/list', {
		method: 'GET',
		query: {
			...pagination,
		},
		transform: input => input.data,
		watch: [pagination],
	})

	const totalCount = computed(() => data.value?.maxCount || 0)
	const items = computed(() => data.value?.items || [])

	return {
		pagination,
		data,
		pending,
		error,
		refresh,
		totalCount,
		items,
	}
})
