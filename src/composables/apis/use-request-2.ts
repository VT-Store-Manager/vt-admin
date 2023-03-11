import { UnwrapRef } from 'nuxt/dist/app/compat/capi'
import { UseFetchOptions } from 'nuxt/dist/app/composables'
import { _AsyncData } from 'nuxt/dist/app/composables/asyncData'

type CustomOption = {
	cached?: boolean
	params?: Record<string, any>
}

const passParamToUrl = (url: string, params: Record<string, any>) => {
	return Object.keys(params).reduce((result, paramName) => {
		return url.replace(`{${paramName}}`, params[paramName])
	}, url)
}

export default function <DataT extends Record<string, any>>(
	url: string,
	options?: UseFetchOptions<DataT>
) {
	type FetchState = _AsyncData<DataT, unknown>

	const runTimeConfig = useRuntimeConfig()
	const state = reactive<{
		data: FetchState['data']['value']
		pending: FetchState['pending']['value']
		error: FetchState['error']['value']
	}>({
		data: null,
		pending: false,
		error: null
	})

	const fetchGet = async (
		fetchOptions?: UseFetchOptions<DataT>,
		customOptions?: CustomOption
	) => {
		const _url = customOptions?.params
			? passParamToUrl(url, customOptions.params)
			: url
		state.pending = true
		try {
			const fetchData = await useFetch(_url, {
				baseURL: runTimeConfig.public.apiBase,
				method: 'GET',
				...options,
				...fetchOptions
			})
			state.data = fetchData.data.value as UnwrapRef<DataT>
			state.error = fetchData.error
		} catch (error) {
			state.error = error
		}
		state.pending = false
	}

	return { ...toRefs(state), fetchGet }
}
