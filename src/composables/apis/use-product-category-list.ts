import useRequest from './use-request'
import { ProductCategoryModel } from '~/types/models/product-category'

export default function () {
	const { response, error, loading, fetchGet } = useRequest<
		ProductCategoryModel[]
	>('http://192.168.1.179:5500/src/sample/product-category.json')

	return { response, error, loading, fetchGet }
}
