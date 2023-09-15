import { codePattern } from '~/constants'
import { OrderDetailModel } from '~/models'

export const useOrderDetail = definePiniaStore('order-detail', () => {
	const orderId = ref('')
	const query = computed(() => {
		if (codePattern.test(orderId.value)) {
			return { code: orderId.value }
		}
		return { id: orderId.value }
	})

	const { data, pending, error, refresh } = useRequest<OrderDetailModel>(
		'/order/detail',
		{
			query,
			immediate: false,
			watch: [orderId],
			transform: input => input.data,
		}
	)

	const fetch = (_orderId: string) => {
		orderId.value = _orderId
		refresh({ dedupe: true })
	}

	return { data, pending, error, refresh, fetch }
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useOrderDetail as any, import.meta.hot)
	)
}
