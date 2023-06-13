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
	mdiTicketPercent,
	mdiSale,
	mdiAccountOutline,
	mdiStarOutline,
	mdiTrophyVariant,
	mdiCartArrowRight,
	mdiApplicationCog,
	mdiApplicationSettingsOutline,
	mdiStoreSettingsOutline,
	mdiTimerSettingsOutline,
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
		name: 'Dashboard',
		url: '/',
		icon: mdiHome,
		sidebar: true,
	},
	{
		name: 'Account',
		icon: mdiAccountGroup,
		url: '',
		sidebar: true,
		sub: [
			{
				name: 'Admin',
				url: '/account/admin',
				icon: mdiShieldAccountOutline,
				sidebar: true,
			},
			{
				name: 'Sale',
				url: '/account/sale',
				icon: mdiPointOfSale,
				sidebar: true,
			},
		],
	},
	{
		name: 'Member',
		icon: mdiAccountStar,
		url: '',
		sidebar: true,
		sub: [
			{
				name: 'Member list',
				url: '/member',
				icon: mdiAccountOutline,
				sidebar: true,
			},
			{
				name: 'Ranking setting',
				url: '/member/rank',
				icon: mdiStarOutline,
				sidebar: true,
			},
		],
	},
	{
		name: 'Product',
		icon: mdiCoffee,
		url: '',
		sidebar: true,
		sub: [
			{
				name: 'List',
				url: '/product',
				icon: mdiListBoxOutline,
				sidebar: true,
			},
			{
				name: 'Categories',
				url: '/product-category',
				icon: mdiShapeOutline,
				sidebar: true,
			},
			{
				name: 'Options',
				url: '/product-option',
				icon: mdiCupOutline,
				sidebar: true,
			},
		],
	},
	{
		name: 'Store',
		url: '/store',
		icon: mdiStore,
		sidebar: true,
	},
	{
		name: 'Voucher',
		url: '/voucher',
		icon: mdiTicketPercent,
		sidebar: true,
	},
	{
		name: 'Promotion',
		url: '/promotion',
		icon: mdiSale,
		sidebar: true,
	},
	{
		name: 'Achievement',
		url: '/achievement',
		icon: mdiTrophyVariant,
		sidebar: true,
		disabled: true,
	},
	{
		name: 'Order history',
		url: '/order',
		icon: mdiCartArrowRight,
		sidebar: true,
	},
	{
		name: 'App setting',
		icon: mdiApplicationCog,
		url: '',
		sidebar: true,
		sub: [
			{
				name: 'General',
				url: '/setting/general',
				icon: mdiApplicationSettingsOutline,
				sidebar: true,
			},
			{
				name: 'Sale app',
				url: '/setting/sale',
				icon: mdiStoreSettingsOutline,
				sidebar: true,
			},
			{
				name: 'OP app',
				url: '/setting/order-processor',
				icon: mdiTimerSettingsOutline,
				sidebar: true,
			},
			{
				name: 'Member app',
				url: '/setting/member',
				icon: mdiAccountSettingsOutline,
				sidebar: true,
			},
		],
	},
]
