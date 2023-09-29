import { AuthModel } from '~/models'

export type AuthAdminType = {
	accessToken: string
	refreshToken: string
}
export type CurrentAdminType = {
	id: string
	username: string
	name: string
	avatar: string
	role: string[]
	updatePassword?: boolean
}
export const useAuthStore = defineStore('authentication', () => {
	const { $router } = useNuxtApp()

	const auth = useCookie<AuthAdminType>(COOKIE_AUTH_KEY, {
		watch: true,
		default: () => ({
			accessToken: '',
			refreshToken: '',
		}),
		maxAge: 60 * 60 * 24 * 365,
	})

	const currentAdmin = useCookie<CurrentAdminType>(COOKIE_CURRENT_ADMIN_KEY, {
		watch: true,
		default: () => ({
			id: '',
			username: '',
			name: '',
			avatar: '',
			role: [],
		}),
		maxAge: 60 * 60 * 24 * 365,
	})
	const callbackUrl = useCookie<string>(CALLBACK_URL_KEY)

	const setAuthData = (data: AuthModel) => {
		auth.value = data.tokens
		currentAdmin.value = data.user
	}
	const setTokenData = (token: AuthAdminType) => {
		auth.value = token
	}

	const refresh = () => {
		if (!auth.value?.refreshToken) return
		useRequest<AuthAdminType>(
			'/auth/refresh',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${auth.value.refreshToken || ''}`,
				},
				onResponse({ response }) {
					if (response.status === 201) {
						setTokenData(response._data.data)
					}
				},
				onRequestError() {
					clear()
					$router.push('/login')
				},
			},
			{ auth: false }
		)
	}

	const clear = () => {
		auth.value = {
			accessToken: '',
			refreshToken: '',
		}
		currentAdmin.value = {
			id: '',
			username: '',
			name: '',
			avatar: '',
			role: [],
		}
	}

	const logout = () => {
		clear()
		$router.push('/login')
	}

	return {
		auth,
		callbackUrl,
		currentAdmin,
		setAuthData,
		refresh,
		clear,
		logout,
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore as any, import.meta.hot))
}
