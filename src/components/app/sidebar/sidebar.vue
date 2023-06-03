<template>
	<aside
		class="sidebar"
		:class="{ 'sidebar-collapse': isCollapse }"
	>
		<v-hover v-slot="{ isHovering, props }">
			<div
				v-bind="props"
				class="sidebar-mask bg-secondary"
				:class="{ hovering: isHovering }"
			>
				<div class="sidebar-head">
					<nuxt-link
						to="/"
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
						>
							<strong>Vuetify</strong>
						</span>
					</nuxt-link>
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
							/>
						</v-btn>
					</v-hover>
				</div>
				<nav
					ref="navRef"
					class="sidebar-nav custom-scrollbar pb-3"
					:class="{ 'is-expand': isHovering || !isCollapse }"
					@scroll="throttleShowScrollbar()"
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
						v-for="route in navigations"
						:key="route.url"
						v-bind="route"
						class="sidebar-nav__item"
						:is-expand="isHovering || !isCollapse"
					/>
				</nav>
			</div>
		</v-hover>
	</aside>
</template>

<script lang="ts" setup>
import { mdiVuetify, mdiArrowLeft } from '@mdi/js'
import { ref } from 'vue'
import _ from 'lodash'
import { navigations } from '~/routes/sidebar-navigation'

const isCollapse = ref(false)
const navRef = ref<null | HTMLElement>(null)
const deleteThrottleScrollbar = _.debounce(() => {
	navRef.value?.classList.remove('show-scrollbar')
}, 500)

const throttleShowScrollbar = _.throttle(() => {
	if (!navRef.value?.classList.contains('show-scrollbar'))
		navRef.value?.classList.add('show-scrollbar')
	deleteThrottleScrollbar()
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
			.v-icon {
				font-size: 32px;
				margin-right: 10px;
				:deep(svg) {
					filter: drop-shadow(0 0 10px $primary-color);
					&:hover {
						filter: drop-shadow(0 0 10px $primary-color-darken);
					}
				}
			}
			span {
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
		&.hovering {
			border-right: 1px solid #eee;
			box-shadow: 3px 0 10px #0001;
		}
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
