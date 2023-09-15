export type AuthModel = {
	tokens: {
		accessToken: string
		refreshToken: string
	}
	user: {
		id: string
		username: string
		role: string[]
		updatePassword?: boolean
	}
}
