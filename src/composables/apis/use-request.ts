import { reactive, toRefs } from 'vue'
import querystring from 'query-string'
import LocalCache from './local-cache'
import HandleError from './handle-error'

interface GetOptions<I = Record<string, any>> {
	signal?: AbortSignal
	localCache?: boolean
	query?: I
}

export default function <R, I = Record<string, any>>(
	url: string,
	options?: any
) {
	const runtimeConfig = useRuntimeConfig()
	const state = reactive<{ response: R | null; error: any; loading: boolean }>({
		response: null,
		error: null,
		loading: false
	})

	const fetchGet = async (customOptions?: GetOptions<I>) => {
		try {
			const _url = `${url}?${querystring.stringify(customOptions?.query ?? {}, {
				arrayFormat: 'bracket',
				skipNull: true,
				skipEmptyString: true
			})}`
			const isCache = customOptions?.localCache
			state.error = null

			if (isCache) {
				const cacheData = LocalCache.get(_url)
				if (cacheData) {
					state.response = cacheData
					return
				}
			}

			const controller = customOptions?.signal
				? getAbortController(10000)
				: null
			state.loading = true
			const res = await $fetch(_url, {
				baseURL: runtimeConfig.public.apiBase,
				signal: customOptions?.signal || controller?.signal,
				...options
			})
			clearTimeout(controller?.timeoutId)

			state.response = res as any
			state.loading = false
			if (isCache) {
				LocalCache.set(_url, res)
			}
		} catch (error) {
			HandleError.unauthorized(error)
			if (!HandleError.isAborted(error)) {
				state.error = error
				state.response = null
				state.loading = false
			}
		}
	}

	return { ...toRefs(state), fetchGet }
}
