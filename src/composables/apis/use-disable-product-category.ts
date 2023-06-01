import { NoContentResponse } from '@/types/request'

export const useDisableProductCategory = definePiniaStore(
	'disable-product-category',
	() => {
		const { response, loading, error, fetch } = useRequest<NoContentResponse>(
			'/v1/admin/product-category/delete/{id}',
			{
				method: 'PATCH',
			}
		)

		return { response, loading, error, fetch }
	}
)
