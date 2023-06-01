import _ from 'lodash'

type BreadcrumbsItem = {
	title: string
	disabled?: boolean
	href: string
}

export const useBreadcrumbs = definePiniaStore('breadcrumbs', () => {
	const items = ref<BreadcrumbsItem[]>([])
	const router = useRouter()

	const disableLastItem = (disabled: boolean) => {
		if (items.value.length > 0) {
			items.value[items.value.length - 1].disabled = disabled
		}
	}

	const push = (itemData: BreadcrumbsItem) => {
		disableLastItem(false)
		items.value.push({
			title: itemData.title,
			href: itemData.href,
			disabled: !!itemData.disabled,
		})
	}

	const pop = () => {
		items.value.pop()
		disableLastItem(true)
	}

	const deleteFromIndex = (index: number) => {
		if (index < 0 || index >= items.value.length - 1) return
		items.value = items.value.slice(0, index + 1)
		disableLastItem(true)
	}

	const assign = (itemsData: BreadcrumbsItem[]) => {
		items.value = itemsData
	}

	;(function init() {
		const currentPaths = router.currentRoute.value.path.split('/').slice(1)
		const allRoutes = router.options.routes
		if (currentPaths[0] === '') return
		for (let i = 0, route = ''; i <= currentPaths.length; i++) {
			route += `/${currentPaths[i]}`
			const findRoute = allRoutes.find(r => r.path === route)
			if (!findRoute) continue
			push({
				title: _.capitalize(findRoute.name!.toString().replaceAll('-', ' ')),
				href: findRoute.path,
				disabled: false,
			})
		}
		if (items.value.length) {
			disableLastItem(
				router.currentRoute.value.path ===
					items.value[items.value.length - 1].href
			)
		}
	})()

	router.afterEach(to => {
		const existItemIndex = items.value.findIndex(item => item.href === to.path)
		if (existItemIndex > -1) {
			deleteFromIndex(existItemIndex)
		} else {
			assign([
				{
					title: _.capitalize(to.name!.toString().replaceAll('-', ' ')),
					href: to.path,
					disabled: true,
				},
			])
		}
	})

	return { items, push, pop, deleteFromIndex, assign }
})
