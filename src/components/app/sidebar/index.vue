<template>
	<aside
		ref="sidebar"
		class="sidebar"
		:class="{ 'sidebar-collapse': isCollapse }"
		@mousemove="showScrollbar()"
	>
		<v-hover v-slot="{ isHovering, props }">
			<div
				class="sidebar-mask bg-secondary"
				v-bind="props"
			>
				<div class="sidebar-head">
					<div
						class="logo"
						:class="{ 'only-icon': isCollapse && !isHovering }"
					>
						<v-icon
							:icon="mdiVuetify"
							size="x-large"
							color="primary"
						/>
						<span
							v-if="!isCollapse || isHovering"
							class="text-primary text-uppercase font-weight-black"
							><strong>Vuetify</strong></span
						>
					</div>
					<v-hover v-slot="{ isHovering: isHovering2, props: props2 }">
						<v-btn
							v-bind="props2"
							class="expand-button"
							:class="{ hide: isCollapse && !isHovering }"
							variant="outlined"
							size="x-small"
							icon
							:color="isHovering2 ? 'primary-darken' : 'grey'"
							@click="isCollapse = !isCollapse"
						>
							<v-icon
								:icon="mdiArrowLeft"
								size="large"
							/> </v-btn
					></v-hover>
				</div>
				<nav
					ref="nav"
					class="sidebar-nav custom-scrollbar pb-3"
					:class="{ 'is-expand': isHovering || !isCollapse }"
					@scroll="showScrollbar()"
				>
					<p
						v-if="isHovering || !isCollapse"
						class="nav-title"
					>
						Menu
					</p>
					<p
						v-else
						class="nav-title collapse"
					>
						...
					</p>
					<app-sidebar-nav
						v-for="nav in navigations"
						:key="nav.url"
						v-bind="nav"
						class="sidebar-nav__item"
						:is-expand="isHovering || !isCollapse"
					/>
				</nav>
			</div>
		</v-hover>
	</aside>
</template>

<script lang="ts" setup>
import {
	mdiVuetify,
	mdiArrowLeft,
	mdiHome,
	mdiAccountGroup,
	mdiShieldAccountOutline,
	mdiPointOfSale,
	mdiAccountStar,
	mdiCoffee,
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
	mdiAccountSettingsOutline,
} from '@mdi/js'
import { Nav } from '~/types'
import { ref } from 'vue'
import _ from 'lodash'

type NavProp = Nav & {
	subnav?: Nav[]
}

const isCollapse = ref(false)
const sidebar = ref<null | HTMLElement>(null)
const nav = ref<null | HTMLElement>(null)
const navigations: NavProp[] = [
	{
		text: 'Dashboard',
		url: '/',
		icon: mdiHome,
	},
	{
		text: 'Account',
		icon: mdiAccountGroup,
		subnav: [
			{
				text: 'Admin',
				url: '/account/admin',
				icon: mdiShieldAccountOutline,
			},
			{
				text: 'Sale',
				url: '/account/sale',
				icon: mdiPointOfSale,
			},
		],
	},
	{
		text: 'Member',
		icon: mdiAccountStar,
		subnav: [
			{
				text: 'Member list',
				url: '/account/member',
				icon: mdiAccountOutline,
			},
			{
				text: 'Ranking setting',
				url: '/account/member',
				icon: mdiStarOutline,
			},
		],
	},
	{
		text: 'Product',
		icon: mdiCoffee,
		subnav: [
			{
				text: 'List',
				url: '/product',
				icon: mdiListBoxOutline,
			},
			{
				text: 'Options',
				url: '/product/option',
				icon: mdiCupOutline,
			},
		],
	},
	{
		text: 'Store',
		url: '/store',
		icon: mdiStore,
	},
	{
		text: 'Voucher',
		url: '/voucher',
		icon: mdiTicketPercent,
	},
	{
		text: 'Promotion',
		url: '/promotion',
		icon: mdiSale,
	},
	{
		text: 'Achievement',
		url: '/achievement',
		icon: mdiTrophyVariant,
	},
	{
		text: 'Order history',
		url: '/order',
		icon: mdiCartArrowRight,
	},
	{
		text: 'Template',
		url: '/template',
		icon: mdiTextBox,
	},
	{
		text: 'App setting',
		icon: mdiApplicationCog,
		subnav: [
			{
				text: 'General',
				url: '/setting-general',
				icon: mdiApplicationSettingsOutline,
			},
			{
				text: 'Sale app',
				url: '/setting-sale',
				icon: mdiStoreSettingsOutline,
			},
			{
				text: 'OP app',
				url: '/setting-order-processor',
				icon: mdiTimerSettingsOutline,
			},
			{
				text: 'Member app',
				url: '/setting-member',
				icon: mdiAccountSettingsOutline,
			},
		],
	},
]
const deleteScrollbar = _.debounce(() => {
	nav.value?.classList.remove('mouse-moving')
}, 500)

const showScrollbar = _.throttle(() => {
	if (!nav.value?.classList.contains('mouse-moving'))
		nav.value?.classList.add('mouse-moving')
	deleteScrollbar()
}, 50)
</script>

<style lang="scss" scoped>
.sidebar {
	width: $sidebar-expand-width;
	z-index: 1;
	transition: width 400ms;

	$sidebar-mask-px: 1rem;
	&-mask {
		transition: width 200ms;
		height: 100%;
		width: $sidebar-expand-width;
		position: relative;
		display: flex;
		flex-direction: column;
		// border-right: 1px solid #eee;
		// box-shadow: 3px 0 10px #0002;
	}
	&-nav {
		height: 100%;
		overflow-y: scroll;
		flex: 1;
		$padding-top-nav: 80px;
		padding-top: $padding-top-nav;

		&::-webkit-scrollbar-button:vertical:decrement {
			height: $padding-top-nav + 10px;
		}

		.nav-title {
			padding-left: 24px;
			text-transform: uppercase;
			font-size: 14px;
			font-weight: bold;
			padding-bottom: 12px;
			opacity: 0.5;
			&.collapse {
				padding-left: $scrollbar-width;
				text-align: center;
			}
		}

		&__item {
			opacity: 0;
			animation: float-to-left 150ms ease-out forwards;

			@for $var from 1 through 14 {
				&:nth-of-type(#{$var}) {
					animation-delay: #{($var - 1) * 100}ms;
				}
			}
		}
	}
	&-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		background-image: linear-gradient($secondary-color 0 75%, transparent);
		padding: 1.15rem $sidebar-mask-px 2.35rem;
		z-index: 1;
		top: 0;
		left: 0;
		right: 0;

		.logo {
			white-space: nowrap;
			display: flex;
			align-items: center;
			transition: margin-left 100ms;
			cursor: pointer;
			animation: float-to-left 500ms;
			&.only-icon {
				text-align: center;
				margin-left: 14px;
			}
			> .v-icon {
				font-size: 32px;
				margin-right: 10px;
				:deep(svg) {
					filter: drop-shadow(0 0 10px $primary-color);
					&:hover {
						filter: drop-shadow(0 0 10px $primary-color-darken);
					}
				}
			}
			> span {
				font-size: 1.25rem;
				&:hover {
					text-shadow: 0 0 20px $primary-color-lighten;
				}
			}
		}
		.expand-button {
			height: 1.3rem;
			width: 1.3rem;
			border-width: 1.5px;
			&.hide {
				visibility: hidden;
			}
			:deep(.v-icon) {
				transition: transform 500ms;
				font-size: 0.875rem;
				animation: shake-left 2000ms infinite;
			}
			&:hover {
				transform: scale(1.2);
				opacity: 0.7;
				animation: pulse-primary 1000ms infinite;
				:deep(.v-icon) {
					animation: none;
				}
			}
		}
	}

	&:hover {
		.sidebar-mask {
			width: $sidebar-expand-width !important;
		}
	}
}
.sidebar.sidebar-collapse {
	width: $sidebar-collapse-width;
	.sidebar-mask {
		width: $sidebar-collapse-width;
	}

	.sidebar-head {
		.expand-button {
			:deep(.v-icon) {
				transform: rotateZ(180deg);
				animation: shake-right 2000ms infinite;
			}
			&:hover {
				animation: pulse-primary 800ms infinite;
				:deep(.v-icon) {
					animation: none;
				}
			}
		}
	}
}
</style>
