import omitBy from 'lodash/omitBy'
import { UseFetchOptions } from 'nuxt/app'
import { AUTH_TOKEN_KEY } from '~/constants'
import { ResponseType } from '~/types'

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

	return useFetch(url, {
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
