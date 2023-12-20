export type AuthModel = {
	tokens: {
		accessToken: string
		refreshToken: string
	}
	user: {
		id: string
		username: string
		name: string
		avatar: string
		roles: string[]
		updatePassword?: boolean
	}
}
