import { serialize } from 'object-to-formdata'
import { CreateProductCategoryModel } from '~/models/create-product-category-model'

export const useCreateProductCategory = definePiniaStore(
	'create-product-category',
	() => {
		const body = ref<FormData>()
		const {
			data: success,
			pending,
			error,
			execute,
			status,
		} = useRequest<boolean>('/product-category/create', {
			method: 'POST',
			body,
			transform: input => input.success,
			immediate: false,
		})
		const executePayload = async (payload: CreateProductCategoryModel) => {
			body.value = serialize(payload, { noFilesWithArrayNotation: true })
			await execute({ dedupe: true })
		}

		return { success, pending, error, executePayload, status }
	}
)
