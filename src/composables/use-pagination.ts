import { Pagination } from '~/types'

export const usePagination = (defaultValue?: Partial<Pagination>) => {
	const route = useRoute()
	const router = useRouter()

	const defaultPagination = {
		page: 1,
		limit: 10,
		...defaultValue,
	}
	const initValue: Pagination = {
		page:
			(() => {
				const page = +(route.query?.page || '')
				if (isNaN(page) || page < 1) return null
				return page
			})() ||
			defaultValue?.page ||
			1,
		limit:
			(() => {
				const limit = +(route.query?.limit || '')
				if (isNaN(limit) || limit < 1) return null
				return limit
			})() ||
			defaultValue?.limit ||
			10,
	}
	const pushPaginationQuery = () => {
		const paginationQuery: Partial<Pagination> = {
			page:
				pagination.page === defaultPagination.page
					? undefined
					: pagination.page,
			limit:
				pagination.limit === defaultPagination.limit
					? undefined
					: pagination.limit,
		}
		router.push({ query: paginationQuery })
	}

	const pagination = reactive<Pagination>(initValue)
	watch(pagination, pushPaginationQuery)

	const updatePage = (_pagination: Pagination = defaultPagination) => {
		Object.assign(pagination, _pagination)
	}

	return { pagination, updatePage, pushPaginationQuery }
}
