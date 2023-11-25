import { defineStore, acceptHMRUpdate } from 'pinia'
import { PaginationDataModel } from '~/models'
import { PartnerListItemDTO } from '~/models/partner-model'

export const usePartnerList = defineStore('partner-list', () => {
	const { items: voucherItems } = storeToRefs(useVoucherList())

	const sortBy = ref('')
	const query = computed(() => ({
		...(sortBy.value ? { sortBy: sortBy.value } : {}),
	}))

	const { data, pending, error, refresh } = useRequest<
		PaginationDataModel<PartnerListItemDTO>
	>('/partner/list', {
		query,
		transform: input => input.data,
	})

	const storedData = ref<PaginationDataModel<PartnerListItemDTO>>(
		data.value || { totalCount: 0, items: [] }
	)

	watch(data, () => {
		if (data.value) storedData.value = data.value
	})

	const items = computed<Array<PartnerListItemDTO & { voucherCount: number }>>(
		() => {
			return (storedData.value?.items || []).map(item => {
				return {
					...item,
					voucherCount: voucherItems.value.reduce((sum, voucher) => {
						return sum + (voucher.partner?.id === item.id ? 1 : 0)
					}, 0),
				}
			})
		}
	)
	const totalCount = computed(() => storedData.value?.totalCount || 0)

	return {
		items,
		totalCount,
		data,
		pending,
		error,
		refresh,
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(usePartnerList as any, import.meta.hot)
	)
}
