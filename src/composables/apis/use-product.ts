import { ProductModel } from '~/models/product'

export const useProduct = definePiniaStore('product', () => {
	const {
		response: data,
		error,
		loading,
		fetchGet: fetch
	} = useRequest<ProductModel[]>('/public/product.json')

	return { data, error, loading, fetch }
})
