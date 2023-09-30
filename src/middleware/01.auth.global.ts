export default defineNuxtRouteMiddleware((to, from) => {
	const { auth, callbackUrl } = storeToRefs(useAuthStore())
	const { $router } = useNuxtApp()

	if (to.path !== '/login' && !auth.value?.accessToken) {
		const isAppRoute = $router.options.routes.find(
			route => route.name === from.name
		)
		callbackUrl.value = isAppRoute && from.path !== '/login' ? from.path : '/'

		return navigateTo('/login')
	} else if (to.path === '/login') {
		if (auth.value?.accessToken) {
			return abortNavigation()
		}
		// eslint-disable-next-line no-console
		console.log('Your session is expired out')
		callbackUrl.value = ''
	}
})
