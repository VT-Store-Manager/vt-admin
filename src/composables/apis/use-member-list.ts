import { MemberListItemModel, PaginationDataModel } from '~/models'

export const useMemberList = definePiniaStore('member-list', () => {
	const { pagination, updatePage, pushPaginationQuery } = usePagination()
	const query = computed(() => ({ ...pagination }))
	const resetQuery = () => updatePage()
	const pushQuery = () => {
		pushPaginationQuery()
	}

	const { data, pending, error, refresh } = useRequest<
		PaginationDataModel<MemberListItemModel>
	>('/v1/admin/member/list', {
		query,
		transform: input => input.data,
		watch: [query],
	})

	const totalCount = computed(() => data.value?.totalCount || 0)
	const items = computed(() => data.value?.items || [])

	return {
		pagination,
		data,
		pending,
		error,
		refresh,
		updatePage,
		totalCount,
		items,
		resetQuery,
		pushQuery,
	}
})
