import { ProductModel } from '~~/src/models/product'

export const useProduct = definePiniaStore('product', () => {
	const {
		response: data,
		error,
		loading,
		fetchGet: fetch
	} = useRequest<ProductModel[]>('/product.json')

	return { data, error, loading, fetch }
})
