import { UseFetchOptions } from 'nuxt/app'
import { AUTH_TOKEN_KEY } from '~/constants'

export default function <ResT = Record<string, any>, DataT = ResT>(
	url: string,
	options?: UseFetchOptions<ResT, DataT>
) {
	const baseURL = useRuntimeConfig().public.apiBase
	return useFetch(url, {
		baseURL,
		...options,
		onRequest({ options }) {
			options.headers = options.headers || {}
			Object.assign(options.headers, {
				Authorization: useCookie<string>(AUTH_TOKEN_KEY).value || '',
			})
		},
	})
}
