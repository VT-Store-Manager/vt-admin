import useRequest from './use-request'
import { ProductModel } from '~/types/models/product'

export default function () {
	const { response, error, loading, fetchGet } = useRequest<ProductModel[]>(
		'http://192.168.1.179:5500/src/sample/product.json'
	)

	return { response, error, loading, fetchGet }
}
