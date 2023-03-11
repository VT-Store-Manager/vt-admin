import querystring from 'query-string'
import { reactive, toRefs } from 'vue'

import HandleError from './handle-error'
import LocalCache from './local-cache'

interface GetOptions<I = Record<string, any>> {
	signal?: AbortSignal
	localCache?: boolean
	query?: I | Record<string, string>
	params?: Record<string, string>
}

interface PostOptions<I = Record<string, any>> {
	query?: I | Record<string, string>
	params?: Record<string, string>
	body?: I | FormData
}

const passParamToUrl = (
	url: string,
	{
		params,
		query
	}: {
		params?: Record<string, string>
		query?: Record<string, string>
	}
) => {
	const _url = `${url}?${querystring.stringify(query ?? {}, {
		arrayFormat: 'bracket',
		skipNull: true,
		skipEmptyString: true
	})}`.replace(/\?$/, '')
	return Object.keys(params || {}).reduce((result, paramName) => {
		return result.replace(`{${paramName}}`, params![paramName])
	}, _url)
}

export default function <R, I = Record<string, any>>(
	url: string,
	options?: Record<string, any>
) {
	const runtimeConfig = useRuntimeConfig()
	const state = reactive<{ response: R | null; error: any; loading: boolean }>({
		response: null,
		error: null,
		loading: false
	})

	const fetchGet = async (getOptions?: GetOptions<I>) => {
		try {
			const _url = passParamToUrl(url, {
				query: getOptions?.query as Record<string, string>,
				params: getOptions?.params
			})

			const isCache = getOptions?.localCache
			state.error = null

			state.loading = true
			if (isCache) {
				const cacheData = LocalCache.get(_url)
				if (cacheData) {
					state.response = cacheData
					return
				}
			}

			const controller = getOptions?.signal ? getAbortController(10000) : null
			const res = await $fetch(_url, {
				baseURL: runtimeConfig.public.apiBase,
				signal: getOptions?.signal || controller?.signal,
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

	const fetch = async (postOptions: PostOptions<I>) => {
		try {
			const _url = passParamToUrl(url, {
				query: postOptions?.query as Record<string, string>,
				params: postOptions?.params
			})

			state.loading = true
			const res = await $fetch(_url, {
				baseURL: runtimeConfig.public.apiBase,
				body: postOptions.body as Record<string, any>,
				...options
			})
			state.response = res as any
		} catch (error) {
			HandleError.unauthorized(error)
			state.error = error
		} finally {
			state.loading = false
		}
	}

	return { ...toRefs(state), fetchGet, fetch }
}
