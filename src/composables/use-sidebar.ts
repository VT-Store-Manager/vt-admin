import { SIDEBAR_COLLAPSE_KEY } from '~/constants'

type CollapseCookieType = 0 | 1 | undefined

export const useSidebar = definePiniaStore('sidebar', () => {
	const collapse = useCookie<CollapseCookieType>(SIDEBAR_COLLAPSE_KEY, {
		watch: true,
	})

	const setCollapse = (value: CollapseCookieType) => {
		collapse.value = value
	}

	return { collapse, setCollapse }
})
