import { defineStore, acceptHMRUpdate } from 'pinia'
import { VoucherDetailModel } from '~/models'

export const useVoucherDetail = defineStore('voucher-detail', () => {
	const voucherId = ref('')

	const { data, pending, error, status, refresh } =
		useRequest<VoucherDetailModel>(() => `/voucher/${voucherId.value}/detail`, {
			transform: input => input.data,
			watch: [voucherId],
			immediate: false,
		})

	const fetchVoucherDetail = (id: string) => {
		voucherId.value = id
	}

	return { data, pending, error, fetchVoucherDetail, status, refresh }
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useVoucherDetail as any, import.meta.hot)
	)
}
