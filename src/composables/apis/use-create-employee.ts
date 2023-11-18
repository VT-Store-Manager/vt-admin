import { serialize } from 'object-to-formdata'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { CreateEmployeeModel, CreateEmployeeResult } from '~/models'

export const useCreateEmployee = defineStore('create-employee', () => {
	const body = ref<FormData>()

	const { data, pending, error, execute, status } =
		useRequest<CreateEmployeeResult>('/employee/create', {
			method: 'POST',
			body,
			immediate: false,
		})

	const isSuccess = computed(() => !!data.value)

	const executeWithPayload = async (payload: CreateEmployeeModel) => {
		body.value = serialize(payload, { noFilesWithArrayNotation: true })
		await execute({ dedupe: true })
	}

	return { data, isSuccess, pending, error, status, executeWithPayload }
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useCreateEmployee as any, import.meta.hot)
	)
}
