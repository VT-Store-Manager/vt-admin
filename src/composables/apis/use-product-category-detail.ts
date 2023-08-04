import { ProductCategoryDetailModel } from '~/models'

export const useProductCategoryDetail = definePiniaStore(
	'product-category-detail',
	() => {
		const categoryId = ref('')
		const query = computed(() => ({ id: categoryId.value }))

		const { data, pending, error, refresh } =
			useRequest<ProductCategoryDetailModel>(config.api.path.categoryDetail, {
				query,
				transform: input => input.data,
				watch: [categoryId],
			})

		const fetch = async (id: string) => {
			categoryId.value = id
			await refresh()
		}

		const categoryData = computed(() => data.value || null)

		return { data, pending, error, refresh, fetch, categoryData }
	}
)
