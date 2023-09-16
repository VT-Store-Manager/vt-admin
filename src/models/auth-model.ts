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
		role: string[]
		updatePassword?: boolean
	}
}
