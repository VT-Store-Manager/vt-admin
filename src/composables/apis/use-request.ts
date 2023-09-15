import omitBy from 'lodash/omitBy'
import { UseFetchOptions } from 'nuxt/app'
import { FetchError } from 'ofetch'
import { ErrorType, ResponseType } from '~/types'

type ExtraRequestOptions = {
	multipart?: boolean
	auth?: boolean
}

export default function <
	DataT = Record<string, any>,
	ResT = ResponseType<DataT>
>(
	url: string,
	options?: UseFetchOptions<ResT, DataT>,
	_extraOptions?: ExtraRequestOptions
) {
	const { $router } = useNuxtApp()
	const extraOptions = {
		auth: true,
		..._extraOptions,
	}

	const authStore = useAuthStore()
	const baseURL = useRuntimeConfig().public.apiBase + config.api.prefix
	const headers = extraOptions
		? {
				...(extraOptions.multipart
					? {
							'Content-Type': 'multipart/form-data',
					  }
					: {}),
		  }
		: {}

	const nuxtFetch = useFetch<
		ResT,
		FetchError<ErrorType>,
		any,
		any,
		ResT,
		DataT
	>(url, {
		baseURL,
		headers,
		onRequest({ options }) {
			if (extraOptions?.auth) {
				options.headers = options.headers || {}
				Object.assign(options.headers, {
					Authorization: `Bearer ${authStore.auth.accessToken || ''}`,
				})
			}
			options.query = omitBy(options.query, v => v == null)
		},
		onResponseError({ response }) {
			if (response.status === 401) {
				if (extraOptions?.auth) {
					authStore.refresh()
				} else {
					authStore.clear()
					$router.push('/login')
				}
			} else if (response.status === 403) {
				authStore.clear()
				$router.push('/login')
			}
		},
		...options,
	})

	// const authExecute = async (opt?: AsyncDataExecuteOptions) => {
	// 	await nuxtFetch.execute(opt)
	// 	if (nuxtFetch.error.value?.status === 401) {
	// 		await nuxtFetch.execute()
	// 		nuxtFetch.execute(opt)
	// 	}
	// }

	return nuxtFetch
}
