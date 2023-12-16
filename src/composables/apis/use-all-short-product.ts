import { defineStore, acceptHMRUpdate } from 'pinia'
import { AllProductInShortModel } from '~/models'

export const useAllShortProduct = defineStore('all-short-product', () => {
	const {
		data: _data,
		pending,
		error,
		refresh,
		status,
	} = useRequest<AllProductInShortModel>('/product/all-short', {
		transform: input => input.data,
	})

	const data = computed<AllProductInShortModel>(() => {
		if (!_data.value)
			return {
				products: [],
				categories: [],
				options: [],
			}
		return _data.value
	})

	return { data, pending, error, refresh, status }
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useAllShortProduct as any, import.meta.hot)
	)
}
