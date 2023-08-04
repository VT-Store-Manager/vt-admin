import { ProductDetailModel } from '~/models'

export const useProductDetail = definePiniaStore('product-detail', () => {
	const productId = ref('')
	const query = computed(() => ({ id: productId.value }))

	const { data, pending, error, refresh } = useRequest<ProductDetailModel>(
		'/product/detail',
		{
			query,
			transform: input => input.data,
			watch: [productId],
		}
	)

	const fetch = async (id: string) => {
		productId.value = id
		await refresh()
	}

	const productData = computed(() => data.value || null)

	return { data, pending, error, refresh, fetch, productData }
})
