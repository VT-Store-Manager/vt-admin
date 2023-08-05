/** COOKIE KEY */
export const SIDEBAR_COLLAPSE_KEY = 'sidebar-collapse'
export const GLOBAL_THEME_KEY = 'global-theme'
export const AUTH_TOKEN_KEY = 'auth-token'
export const STORE_DISPLAY_KEY = 'store-display'
export const SHOW_SUB_OPTION_LIST = 'show-sub-option-list'

/** CONFIG VALUE */
export const PROGRESS_LINEAR_CYCLE_TIME = 2200
export const Gender = ['male', 'female', 'other'] as const
export const publishState = ['not yet', 'open', 'closed'] as const

export const momentTimezone = 'Asia/Ho_Chi_Minh'

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
	NOT_YET = 'not yet',
	OPENING = 'open',
	CLOSED = 'closed',
}

export enum ShippingMethod {
	IN_STORE,
	PICK_UP,
	DELIVERY,
	NONE = -1,
}

export enum PaymentType {
	CAST,
	MOMO,
}

export enum OrderState {
	PENDING = 'pending',
	PROCESSING = 'processing',
	DONE = 'done',
	CANCELED = 'canceled',
}

export enum SortOrder {
	ASC,
	DESC,
}
