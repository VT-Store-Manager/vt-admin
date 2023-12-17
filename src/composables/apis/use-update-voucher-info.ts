import { serialize } from 'object-to-formdata'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { EditVoucherInfoModel } from '~/models'

export const useUpdateVoucherInfo = defineStore('update-voucher-info', () => {
	const body = ref<FormData>()
	const voucherId = ref('')

	const {
		data: success,
		pending,
		error,
		execute,
	} = useRequest<boolean>(() => `/voucher/${voucherId.value}/info`, {
		method: 'PATCH',
		body,
		transform: input => input.success,
		immediate: false,
		watch: false,
	})

	const executePayload = async (
		_voucherId: string,
		payload: Partial<EditVoucherInfoModel>
	) => {
		voucherId.value = _voucherId
		body.value = serialize(payload, { noFilesWithArrayNotation: true })

		await execute({ dedupe: true })
	}

	return { success, pending, error, executePayload }
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useUpdateVoucherInfo as any, import.meta.hot)
	)
}
