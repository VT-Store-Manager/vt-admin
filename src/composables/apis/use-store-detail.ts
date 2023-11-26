import { defineStore, acceptHMRUpdate } from 'pinia'
import {
	ProductCategoryListItemModel,
	ProductOptionListItemModel,
	StoreDetailModel,
} from '~/models'

export const useStoreDetail = defineStore('store-detail', () => {
	const { categoryMap } = storeToRefs(useProductCategoryList())
	const { optionMap } = storeToRefs(useProductOptionList())

	const storeId = ref('')
	const query = computed(() => ({
		id: storeId.value,
	}))

	const { data, pending, error, refresh } = useRequest<StoreDetailModel>(
		'/store/detail',
		{
			query,
			transform: input => input.data,
			watch: [storeId],
		}
	)

	const fetch = async (id: string) => {
		storeId.value = id
		await refresh()
	}

	const storeData = computed(() => {
		if (!data.value) return null

		return {
			...data.value,
			unavailableGoods: {
				product: data.value.unavailableGoods.product.map(item => {
					return {
						...item,
						categoryName:
							categoryMap.value.get(item.category)?.name || 'Unknown category',
					}
				}),
				category: data.value.unavailableGoods.category.map(
					(
						categoryId
					): Pick<
						ProductCategoryListItemModel,
						'id' | 'name' | 'image' | 'amountOfProduct'
					> => {
						const category = categoryMap.value.get(categoryId)
						if (!category)
							return {
								id: categoryId,
								name: 'Unknown category',
								image: '',
								amountOfProduct: 0,
							}

						return {
							id: categoryId,
							name: category.name,
							image: category.image,
							amountOfProduct: category.amountOfProduct,
						}
					}
				),
				option: data.value.unavailableGoods.option.map(
					(
						optionId
					): Pick<
						ProductOptionListItemModel,
						'id' | 'name' | 'items' | 'applying'
					> => {
						const option = optionMap.value.get(optionId)

						if (!option)
							return {
								id: optionId,
								name: 'Unknown option',
								items: [],
								applying: 0,
							}

						return {
							id: optionId,
							name: option.name,
							items: option.items,
							applying: option.applying,
						}
					}
				),
			},
		}
	})

	return { data, storeId, pending, error, refresh, fetch, storeData }
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useStoreDetail as any, import.meta.hot)
	)
}
