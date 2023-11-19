import { serialize } from 'object-to-formdata'
import { CreateStoreModel } from '~/models'

export const useCreateStore = definePiniaStore('create-store', () => {
	const body = ref<FormData>()
	const {
		data: success,
		pending,
		error,
		execute,
		status,
	} = useRequest<boolean>('/store/create', {
		method: 'POST',
		body,
		transform: input => input.success,
		immediate: false,
	})
	const executePayload = async (payload: CreateStoreModel) => {
		body.value = serialize(payload, { noFilesWithArrayNotation: true })
		await execute({ dedupe: true })
	}

	return { success, pending, error, executePayload, status }
})
