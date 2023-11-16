import { serialize } from 'object-to-formdata'
import { defineStore, acceptHMRUpdate } from 'pinia'
import {
	CreateShipperModel,
	CreateShipperResult,
} from '~/models/create-shipper-model'

export const useCreateShipper = defineStore('create-shipper', () => {
	const body = ref<FormData>()

	const { data, pending, error, execute, status } =
		useRequest<CreateShipperResult>('/shipper/create', {
			method: 'POST',
			body,
			immediate: false,
		})

	const isSuccess = computed(() => !!data.value)

	const executeWithPayload = async (payload: CreateShipperModel) => {
		body.value = serialize(payload, { noFilesWithArrayNotation: true })
		await execute({ dedupe: true })
	}

	return { data, isSuccess, pending, error, status, executeWithPayload }
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useCreateShipper as any, import.meta.hot)
	)
}
