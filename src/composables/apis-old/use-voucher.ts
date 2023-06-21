import { BaseResponse, Pagination } from '~/types'
import { VoucherListModel } from '~/models_old/voucher-model'

export const useVoucher = definePiniaStore('voucher', () => {
	const router = useRouter()
	const { response, loading, error, fetchGet } = useRequest<
		BaseResponse<VoucherListModel>,
		Pagination
	>('/v1/admin/voucher')

	const pagination = reactive({
		page: 1,
		limit: 20,
	})

	const fetch = () =>
		fetchGet({
			query: { page: pagination.page, limit: pagination.limit },
		})

	const defaultResponse: VoucherListModel = {
		maxCount: 0,
		items: [],
	}

	watch(pagination, () => {
		router.push({
			query: {
				page: pagination.page,
				limit: pagination.limit,
			},
		})
	})

	return { response, error, loading, fetch, pagination, defaultResponse }
})
