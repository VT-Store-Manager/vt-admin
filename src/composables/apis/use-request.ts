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

			state.loading = true
			const res = await $fetch(_url, {
				signal: customOptions?.signal,
				...options
			})

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
