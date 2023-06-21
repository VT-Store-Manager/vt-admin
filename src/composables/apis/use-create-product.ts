import { CreateProductModel } from '~/models'

export const useCreateProduct = definePiniaStore('create-product', () => {
	const body = reactive<CreateProductModel>({
		name: '',
		images: [],
		category: '',
		originalPrice: 0,
		description: '',
		options: [],
	})
	const {
		data: success,
		pending,
		error,
		execute,
	} = useRequest<boolean>(
		'/v1/admin/product/create',
		{
			method: 'POST',
			body,
			transform: input => input.success,
		},
		{
			multipart: true,
		}
	)
	const copyToBody = (payload: CreateProductModel) => {
		Object.assign(body, payload)
	}

	return { success, pending, error, execute, copyToBody }
})
