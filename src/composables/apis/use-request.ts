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
	const extraOptions = {
		auth: true,
		..._extraOptions,
	}
	const { $router } = useNuxtApp()

	const authStore = useAuthStore()
	const baseURL = useRuntimeConfig().public.apiBase + config.api.prefix
	const accessToken = ref(authStore.auth.accessToken)

	watch(
		() => authStore.auth,
		() => {
			if (authStore.auth.accessToken) {
				accessToken.value = authStore.auth.accessToken
			}
		}
	)

	const headers = computed(() => {
		const _headers: Record<string, string> = {}
		if (extraOptions.auth) {
			_headers.Authorization = `Bearer ${
				accessToken.value || authStore.auth.accessToken || ''
			}`
		}
		if (extraOptions.multipart) {
			_headers['Content-Type'] = 'multipart/form-data'
		}
		return {
			..._headers,
			...((options?.headers || {}) as Record<string, string>),
		}
	})

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
		...(options?.method?.toString().toUpperCase() !== 'GET'
			? { watch: false }
			: {}),
		...options,
	})

	return nuxtFetch
}
