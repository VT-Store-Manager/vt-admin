import { defineStore, acceptHMRUpdate } from 'pinia'
import { StoreDetailModel } from '~/models'

export const useStoreDetail = defineStore('store-detail', () => {
	const storeId = ref('')
	const query = computed(() => ({
		id: storeId.value,
	}))

	const { data, pending, error, refresh, execute } =
		useRequest<StoreDetailModel>('/store/detail', {
			query,
			transform: input => input.data,
			watch: [storeId],
		})

	const fetch = async (id: string) => {
		storeId.value = id
		await refresh()
	}

	const storeData = computed(() => {
		if (!data.value) return null

		return data.value
	})

	return { data, storeId, pending, error, refresh, fetch, storeData, execute }
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useStoreDetail as any, import.meta.hot)
	)
}
