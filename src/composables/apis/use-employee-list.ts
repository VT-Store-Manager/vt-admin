import { defineStore, acceptHMRUpdate } from 'pinia'
import { EmployeeListItemModel, PaginationDataModel } from '~/models'

export const useEmployeeList = defineStore('employee-list', () => {
	const { pagination, updatePage, pushPaginationQuery } = usePagination()
	const query = computed(() => ({ ...pagination }))
	const resetQuery = () => updatePage()
	const pushQuery = () => {
		pushPaginationQuery()
	}

	const { data, pending, error, refresh } = useRequest<
		PaginationDataModel<EmployeeListItemModel>
	>('/employee/list', {
		query,
		transform: input => input.data,
		watch: [pagination],
	})

	const storedData = ref<PaginationDataModel<EmployeeListItemModel>>(
		data.value || { totalCount: 0, items: [] }
	)

	watch(data, () => {
		if (data.value) storedData.value = data.value
	})

	const items = computed(() => {
		return storedData.value?.items || []
	})
	const totalCount = computed(() => storedData.value?.totalCount || 0)

	return {
		pagination,
		items,
		totalCount,
		data,
		pending,
		error,
		refresh,
		updatePage,
		resetQuery,
		pushQuery,
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useEmployeeList as any, import.meta.hot)
	)
}
