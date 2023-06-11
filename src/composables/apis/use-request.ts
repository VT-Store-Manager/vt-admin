import { UseFetchOptions } from 'nuxt/app'
import { AUTH_TOKEN_KEY } from '~/constants'
import { DataResponse } from '~/types'

export default function <
	DataT = Record<string, any>,
	ResT = DataResponse<DataT>
>(
	url: string,
	options?: UseFetchOptions<ResT, DataT>,
	customOptions?: { pushQuery?: boolean; replaceQuery?: boolean }
) {
	const baseURL = useRuntimeConfig().public.apiBase
	const route = useRoute()
	const router = useRouter()
	return useFetch(url, {
		baseURL,
		onRequest({ options }) {
			options.headers = options.headers || {}
			Object.assign(options.headers, {
				Authorization: useCookie<string>(AUTH_TOKEN_KEY).value || '',
			})
		},
		onResponse({ options }) {
			if (customOptions?.pushQuery) {
				router.push({
					query: {
						...route.query,
						...options.query,
					},
				})
			} else if (customOptions?.replaceQuery) {
				router.push({
					query: {
						...options.query,
					},
				})
			}
		},
		...options,
	})
}
