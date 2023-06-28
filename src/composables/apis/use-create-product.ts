import { serialize } from 'object-to-formdata'
import { CreateProductModel } from '~/models'

export const useCreateProduct = definePiniaStore('create-product', () => {
	const body = ref<FormData>()
	const {
		data: success,
		pending,
		error,
		execute,
		status,
	} = useRequest<boolean>('/v1/admin/product/create', {
		method: 'POST',
		body,
		transform: input => input.success,
		immediate: false,
	})
	const executePayload = async (payload: CreateProductModel) => {
		body.value = serialize(payload, { noFilesWithArrayNotation: true })
		await execute({ dedupe: true })
	}

	return { success, pending, error, executePayload, status }
})
