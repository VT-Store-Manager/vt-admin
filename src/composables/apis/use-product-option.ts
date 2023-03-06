import useRequest from './use-request'
import {
	ProductOptionModel,
	ProductOptionItem
} from '~/models/product/product-option'
import { VSelectModel } from '~/types'

export const useProductOption = definePiniaStore('product-option', () => {
	const {
		response: data,
		error,
		loading,
		fetchGet: fetch
	} = useRequest<ProductOptionModel[]>('/product-options.json')
	const markId = ref('')
	const selectedItem = ref<string[]>([])

	const getMarked = computed(() => {
		if (!data.value || !markId.value) return null
		return data.value.find(option => option.id === markId.value)
	})

	const getAllNameForSelect = computed((): VSelectModel[] => {
		if (!data.value) return []
		return data.value
			.filter(option => !option.parent)
			.map(option => ({
				title: option.name,
				value: option.id
			}))
	})

	const getItemsOfMarkedForSelect = computed((): VSelectModel[] => {
		return (
			getMarked.value?.items.map(item => ({
				title: item.name,
				value: item.key || ''
			})) || []
		)
	})

	const getSelectedItem = computed(() => {
		const items = getMarked.value?.items || []
		return selectedItem.value.map(itemKey => {
			return items.find(item => item.key === itemKey)
		}) as ProductOptionItem[]
	})

	const clearSelected = () => {
		// markId.value = ''
		selectedItem.value = []
	}

	const getOptionsById = (ids: string[]): ProductOptionModel[] | undefined => {
		return data.value?.filter(option => ids.includes(option.id))
	}

	return {
		data,
		error,
		loading,
		fetch,
		markId,
		selectedItem,
		getMarked,
		getAllNameForSelect,
		getItemsOfMarkedForSelect,
		getSelectedItem,
		clearSelected,
		getOptionsById
	}
})
