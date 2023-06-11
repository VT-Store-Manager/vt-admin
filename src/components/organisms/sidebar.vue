<template>
	<aside
		class="sidebar"
		:class="{
			'sidebar-collapse': sidebar.collapse,
			dark: isDark,
		}"
	>
		<v-hover v-slot="{ isHovering, props }">
			<div
				v-bind="props"
				class="sidebar-mask bg-surface"
				:class="{ hovering: isHovering }"
			>
				<div class="sidebar-head">
					<molecule-sidebar-logo :sidebar-hovering="isHovering" />
					<molecule-sidebar-btn-collapse :sidebar-hovering="isHovering" />
				</div>
				<nav
					ref="navRef"
					class="sidebar-nav custom-scrollbar pb-3"
					:class="{ 'is-expand': isHovering || !sidebar.collapse }"
					@scroll="throttleShowScrollbar()"
				>
					<p
						v-if="isHovering || !sidebar.collapse"
						class="nav-title"
					>
						Menu
					</p>
					<p
						v-else
						class="nav-title collapse"
					>
						<v-icon
							:icon="mdiDotsHorizontal"
							size="small"
						/>
					</p>
					<template
						v-for="route in routes"
						:key="route.url"
					>
						<molecule-sidebar-nav-item
							v-if="route.sidebar"
							class="sidebar-nav__item"
							:data="route"
							:is-expand="isHovering || !sidebar.collapse"
						/>
					</template>
				</nav>
			</div>
		</v-hover>
	</aside>
</template>

<script lang="ts" setup>
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import { mdiDotsHorizontal } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { routes } from '~/routes'

const sidebar = useSidebar()
const { isDark } = storeToRefs(useThemeUtil())
const navRef = ref<null | HTMLElement>(null)

const deleteThrottleScrollbar = debounce(() => {
	navRef.value?.classList.remove('show-scrollbar')
}, 500)

const throttleShowScrollbar = throttle(() => {
	if (!navRef.value?.classList.contains('show-scrollbar'))
		navRef.value?.classList.add('show-scrollbar')
	deleteThrottleScrollbar()
}, 50)
</script>

<style lang="scss" scoped>
.sidebar {
	width: $sidebar-expand-width;
	z-index: 9999;
	transition: width 200ms;

	$sidebar-mask-px: 1rem;
	&-mask {
		transition: width 200ms;
		height: 100%;
		width: $sidebar-expand-width;
		position: relative;
		display: flex;
		flex-direction: column;
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
		&::-webkit-scrollbar-thumb {
			visibility: hidden;
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
			animation: float-to-left 400ms ease-out forwards;

			@for $var from 1 through 14 {
				&:nth-of-type(#{$var}) {
					animation-delay: #{($var - 1) * 50}ms;
				}
			}
		}
	}
	&-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		background-image: linear-gradient(
			rgb(var(--v-theme-surface)) 0 75%,
			transparent
		);
		padding: 1.15rem $sidebar-mask-px 2.35rem;
		z-index: 1;
		top: 0;
		left: 0;
		right: 0;
	}

	&:hover {
		.sidebar-mask {
			width: $sidebar-expand-width !important;
		}
	}
	&.dark {
		.sidebar-head {
			background-image: linear-gradient(
				rgb(var(--v-theme-surface)) 0 75%,
				transparent
			);
		}
	}
}
.sidebar.sidebar-collapse {
	width: $sidebar-collapse-width;
	.sidebar-mask {
		width: $sidebar-collapse-width;
		&.hovering {
			border-right: 1px solid #eee;
			box-shadow: 3px 0 10px #0001;
		}
	}
	&.dark {
		.sidebar-mask.hovering {
			border-width: 0;
			box-shadow: 5px 0 10px #0006;
		}
	}
}
</style>
