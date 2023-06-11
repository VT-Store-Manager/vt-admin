import { Pagination } from '~/types'

export const usePagination = (defaultValue?: Partial<Pagination>) => {
	const route = useRoute()

	const pagination = reactive<Pagination>({
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
	})

	const updatePage = (_pagination: Pagination) => {
		Object.assign(pagination, _pagination)
	}

	return { pagination, updatePage }
}
