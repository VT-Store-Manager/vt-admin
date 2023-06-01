import { ProductModel } from '~/models/product'

import { BaseResponse, VSelectModel } from '~/types'

export const useProduct = definePiniaStore('product', () => {
	const {
		response,
		error,
		loading,
		fetchGet: fetch,
	} = useRequest<BaseResponse<ProductModel[]>>('/v1/admin/product')

	const productSelect = computed((): VSelectModel[] => {
		return (
			response.value?.data.map(
				(product): VSelectModel => ({
					title: product.name,
					value: product.id,
				})
			) || []
		)
	})

	const dataLen = computed(() => response.value?.data.length || 0)

	return { response, error, loading, fetch, productSelect, dataLen }
})
