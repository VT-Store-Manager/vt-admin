import omitBy from 'lodash/omitBy'
import { UseFetchOptions } from 'nuxt/app'
import { FetchError } from 'ofetch'
import { AUTH_TOKEN_KEY } from '~/constants'
import { ErrorType, ResponseType } from '~/types'

type ExtraRequestOptions = {
	multipart?: boolean
	bearerToken?: string
}

export default function <
	DataT = Record<string, any>,
	ResT = ResponseType<DataT>
>(
	url: string,
	options?: UseFetchOptions<ResT, DataT>,
	extraOptions?: ExtraRequestOptions
) {
	const baseURL = useRuntimeConfig().public.apiBase
	const headers = extraOptions
		? {
				...(extraOptions.bearerToken
					? {
							Authorization: `Bearer ${extraOptions.bearerToken}`,
					  }
					: {}),
				...(extraOptions.multipart
					? {
							'Content-Type': 'multipart/form-data',
					  }
					: {}),
		  }
		: {}

	return useFetch<ResT, FetchError<ErrorType>, any, any, ResT, DataT>(url, {
		baseURL,
		headers,
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
