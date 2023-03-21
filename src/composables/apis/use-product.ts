import { ProductModel } from '~/models/product'

import { BaseResponse, VSelectModel } from '~/types'

export const useProduct = definePiniaStore('product', () => {
	const {
		response,
		error,
		loading,
		fetchGet: fetch
	} = useRequest<BaseResponse<ProductModel[]>>('/product')

	const productSelect = computed((): VSelectModel[] => {
		return (
			response.value?.data.map(
				(product): VSelectModel => ({
					title: product.name,
					value: product.id
				})
			) || []
		)
	})

	return { response, error, loading, fetch, productSelect }
})
