import useRequest from './use-request'
import {
	ProductOptionItem,
	ProductOptionListItemModel
} from '~/models/product/product-option'
import { BaseResponse, VSelectModel } from '~/types'

export const useProductOptionList = definePiniaStore(
	'product-option-list',
	() => {
		const {
			response,
			error,
			loading,
			fetchGet: fetch
		} = useRequest<BaseResponse<ProductOptionListItemModel[]>>(
			'/product-option/list'
		)
		const markId = ref('')
		const selectedItem = ref<string[]>([])

		const optionMap = computed(
			() => new Map(response.value?.data.map(option => [option.id, option]))
		)

		const getMarked = computed(() => {
			if (!response.value!.data || !markId.value) return null
			return response.value!.data.find(option => option.id === markId.value)
		})

		const getAllNameForSelect = computed((): VSelectModel[] => {
			if (!response.value?.data) return []
			return response
				.value!.data.filter(option => !option.parent)
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
			selectedItem.value = []
		}

		const getOptionsById = (
			ids: string[]
		): ProductOptionListItemModel[] | undefined => {
			return response.value?.data.filter(option => ids.includes(option.id))
		}

		return {
			response,
			error,
			loading,
			fetch,
			markId,
			selectedItem,
			optionMap,
			getMarked,
			getAllNameForSelect,
			getItemsOfMarkedForSelect,
			getSelectedItem,
			clearSelected,
			getOptionsById
		}
	}
)
