/** COOKIE KEY */
export const SIDEBAR_COLLAPSE_KEY = 'sidebar-collapse'
export const GLOBAL_THEME_KEY = 'global-theme'
export const AUTH_TOKEN_KEY = 'auth-token'

/** CONFIG VALUE */
export const PROGRESS_LINEAR_CYCLE_TIME = 2200
export const Gender = ['male', 'female', 'other'] as const

/** ENUMERATION */
export enum AppTheme {
	DARK = 'dark',
	LIGHT = 'light',
}

export enum Status {
	ACTIVE = 'active',
	DISABLED = 'disabled',
	REMOVED = 'removed',
}

export enum PublishStatus {
	NOT_YET,
	OPENING,
	CLOSED,
}
