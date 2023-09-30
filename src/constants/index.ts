/** COOKIE KEY */
export const SIDEBAR_COLLAPSE_KEY = 'sidebar-collapse'
export const GLOBAL_THEME_KEY = 'global-theme'
export const AUTH_TOKEN_KEY = 'auth-token'
export const STORE_DISPLAY_KEY = 'store-display'
export const SHOW_SUB_OPTION_LIST = 'show-sub-option-list'
export const CALLBACK_URL_KEY = 'callback-url-key'
export const COOKIE_AUTH_KEY = 'authentication'
export const COOKIE_CURRENT_ADMIN_KEY = 'current_admin'

/** CONFIG VALUE */
export const PROGRESS_LINEAR_CYCLE_TIME = 2200
export const Gender = ['male', 'female', 'other'] as const
export const publishState = ['not yet', 'open', 'closed'] as const

export const momentTimezoneName = 'Asia/Ho_Chi_Minh'

export const codePattern = /^[A-Z0-9]+$/

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

export enum RangeTimeType {
	DAY = 'day',
	WEEK = 'week',
	MONTH = 'month',
	QUARTER = 'quarter',
	YEAR = 'year',
}

export enum StoreCriterion {
	SERVICE,
	PRODUCT,
	APPLICATION,
	SPACE,
}

export const shippingMethodName: Record<ShippingMethod, string> = {
	[ShippingMethod.NONE]: '',
	[ShippingMethod.IN_STORE]: 'Tại cửa hàng',
	[ShippingMethod.PICK_UP]: 'Đến lấy',
	[ShippingMethod.DELIVERY]: 'Giao hàng',
}

export enum AdminFeature {
	PRODUCT = 'PRODUCT',
	STORE = 'STORE',
	MEMBER = 'MEMBER',
	VOUCHER = 'VOUCHER',
	ORDER = 'ORDER',
	ACCOUNT = 'ACCOUNT',
	SETTING = 'SETTING',
	COMMON = 'COMMON',
}
export type AdminFeatureType = `${AdminFeature}`

export enum Action {
	READ = 'read',
	MODIFY = 'modify',
	ANALYSE = 'analyse',
}
export type ActionType = `${Action}`
