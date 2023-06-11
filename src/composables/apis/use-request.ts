import omitBy from 'lodash/omitBy'
import { UseFetchOptions } from 'nuxt/app'
import { AUTH_TOKEN_KEY } from '~/constants'
import { DataResponse } from '~/types'

export default function <
	DataT = Record<string, any>,
	ResT = DataResponse<DataT>
>(url: string, options?: UseFetchOptions<ResT, DataT>) {
	const baseURL = useRuntimeConfig().public.apiBase

	return useFetch(url, {
		baseURL,
		onRequest({ options }) {
			options.headers = options.headers || {}
			Object.assign(options.headers, {
				Authorization: useCookie<string>(AUTH_TOKEN_KEY).value || '',
			})
			options.query = omitBy(options.query, v => v == null)
		},
		...options,
	})
}
