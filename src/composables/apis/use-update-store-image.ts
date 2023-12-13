import { defineStore, acceptHMRUpdate } from 'pinia'
import { serialize } from 'object-to-formdata'
import { StoreDetailModel, UpdateStoreImagesModel } from '~/models'

export const useUpdateStoreImage = defineStore('update-store-image', () => {
	const body = ref<FormData>()
	const query = reactive({
		id: '',
	})

	const { data, pending, execute, status } = useRequest<
		Pick<StoreDetailModel, 'images'>
	>('/store/update-image', {
		method: 'PATCH',
		body,
		query,
		transform: input => input.data,
		immediate: false,
	})

	const executePayload = async (
		storeId: string,
		payload: UpdateStoreImagesModel
	) => {
		query.id = storeId
		body.value = serialize(payload, { noFilesWithArrayNotation: true })
		await execute({ dedupe: true })
	}

	return { executePayload, data, pending, status }
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useUpdateStoreImage as any, import.meta.hot)
	)
}
