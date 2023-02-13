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
	mdiTextBox,
	mdiApplicationCog,
	mdiApplicationSettingsOutline,
	mdiStoreSettingsOutline,
	mdiTimerSettingsOutline,
	mdiAccountSettingsOutline
} from '@mdi/js'
import { Nav } from '../types'

type NavProp = Nav & {
	subnav?: Nav[]
}

export const navigations: NavProp[] = [
	{
		name: 'Dashboard',
		url: '/',
		icon: mdiHome
	},
	{
		name: 'Account',
		icon: mdiAccountGroup,
		subnav: [
			{
				name: 'Admin',
				url: '/account/admin',
				icon: mdiShieldAccountOutline
			},
			{
				name: 'Sale',
				url: '/account/sale',
				icon: mdiPointOfSale
			}
		]
	},
	{
		name: 'Member',
		icon: mdiAccountStar,
		subnav: [
			{
				name: 'Member list',
				url: '/account/member',
				icon: mdiAccountOutline
			},
			{
				name: 'Ranking setting',
				url: '/account/member',
				icon: mdiStarOutline
			}
		]
	},
	{
		name: 'Product',
		icon: mdiCoffee,
		subnav: [
			{
				name: 'List',
				url: '/product',
				icon: mdiListBoxOutline
			},
			{
				name: 'Categories',
				url: '/product-category',
				icon: mdiShapeOutline
			},
			{
				name: 'Options',
				url: '/product-option',
				icon: mdiCupOutline
			}
		]
	},
	{
		name: 'Store',
		url: '/store',
		icon: mdiStore
	},
	{
		name: 'Voucher',
		url: '/voucher',
		icon: mdiTicketPercent
	},
	{
		name: 'Promotion',
		url: '/promotion',
		icon: mdiSale
	},
	{
		name: 'Achievement',
		url: '/achievement',
		icon: mdiTrophyVariant
	},
	{
		name: 'Order history',
		url: '/order',
		icon: mdiCartArrowRight
	},
	{
		name: 'Template',
		url: '/template',
		icon: mdiTextBox
	},
	{
		name: 'App setting',
		icon: mdiApplicationCog,
		subnav: [
			{
				name: 'General',
				url: '/setting-general',
				icon: mdiApplicationSettingsOutline
			},
			{
				name: 'Sale app',
				url: '/setting-sale',
				icon: mdiStoreSettingsOutline
			},
			{
				name: 'OP app',
				url: '/setting-order-processor',
				icon: mdiTimerSettingsOutline
			},
			{
				name: 'Member app',
				url: '/setting-member',
				icon: mdiAccountSettingsOutline
			}
		]
	}
]
