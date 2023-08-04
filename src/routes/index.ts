import {
	mdiHome,
	mdiAccountGroup,
	mdiShieldAccountOutline,
	mdiPointOfSale,
	mdiAccountStar,
	mdiCoffee,
	mdiShapeOutline,
	mdiCupOutline,
	mdiListBoxOutline,
	mdiStore,
	mdiTicketPercentOutline,
	mdiSaleOutline,
	mdiAccountOutline,
	mdiStarOutline,
	mdiCartArrowRight,
	mdiApplicationCog,
	mdiApplicationSettingsOutline,
	mdiStoreSettingsOutline,
	mdiAccountSettingsOutline,
} from '@mdi/js'

export type SubNavItem = {
	name: string
	icon?: string
	url: string
	sidebar?: boolean
	disabled?: boolean
}

export type NavItem = {
	name: string
	icon?: string
	url: string
	sidebar?: boolean
	disabled?: boolean
	sub?: SubNavItem[]
}

export const routes: NavItem[] = [
	{
		name: 'Trang chủ',
		url: '/',
		icon: mdiHome,
		sidebar: true,
	},
	{
		name: 'Sản phẩm',
		icon: mdiCoffee,
		url: '',
		sidebar: true,
		sub: [
			{
				name: 'Danh sách',
				url: '/product',
				icon: mdiListBoxOutline,
				sidebar: true,
			},
			{
				name: 'Phân loại',
				url: '/product/category',
				icon: mdiShapeOutline,
				sidebar: true,
			},
			{
				name: 'Lựa chọn',
				url: '/product/option',
				icon: mdiCupOutline,
				sidebar: true,
			},
		],
	},
	{
		name: 'Cửa hàng',
		url: '/store',
		icon: mdiStore,
		sidebar: true,
	},
	{
		name: 'Thành viên',
		icon: mdiAccountStar,
		url: '',
		sidebar: true,
		sub: [
			{
				name: 'Danh sách',
				url: '/member',
				icon: mdiAccountOutline,
				sidebar: true,
			},
			{
				name: 'Cấp bậc',
				url: '/member/rank',
				icon: mdiStarOutline,
				sidebar: true,
			},
			{
				name: 'Ưu đãi',
				url: '/member/voucher',
				icon: mdiTicketPercentOutline,
				sidebar: true,
			},
			{
				name: 'Đổi ưu đãi',
				url: '/member/promotion',
				icon: mdiSaleOutline,
				sidebar: true,
			},
		],
	},
	{
		name: 'Đơn hàng',
		url: '/order',
		icon: mdiCartArrowRight,
		sidebar: true,
	},
	{
		name: 'Tài khoản',
		icon: mdiAccountGroup,
		url: '',
		sidebar: true,
		sub: [
			{
				name: 'Super-admin',
				url: '/account/super-admin',
				icon: mdiShieldAccountOutline,
				sidebar: true,
			},
			{
				name: 'Admin',
				url: '/account/admin',
				icon: mdiPointOfSale,
				sidebar: true,
			},
		],
	},
	{
		name: 'Cài đặt',
		icon: mdiApplicationCog,
		url: '',
		sidebar: true,
		sub: [
			{
				name: 'Chung',
				url: '/setting/general',
				icon: mdiApplicationSettingsOutline,
				sidebar: true,
			},
			{
				name: 'App thành viên',
				url: '/setting/member',
				icon: mdiAccountSettingsOutline,
				sidebar: true,
			},
			{
				name: 'App cửa hàng',
				url: '/setting/store',
				icon: mdiStoreSettingsOutline,
				sidebar: true,
			},
			{
				name: 'App quản lý',
				url: '/setting/admin',
				icon: mdiStoreSettingsOutline,
				sidebar: true,
			},
		],
	},
]
