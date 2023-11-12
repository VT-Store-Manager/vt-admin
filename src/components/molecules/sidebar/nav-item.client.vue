<template>
	<div
		class="nav mb-1"
		:class="{ disabled: isDisabled }"
	>
		<v-hover>
			<template #default="{ isHovering, props: hoverProps }">
				<atom-link :to="data.url">
					<atom-btn
						v-ripple
						:prepend-icon="data.icon"
						class="nav__item"
						:class="[
							...(isCorrectRoute(data.url) || isSubnavActive
								? ['subnav-active']
								: []),
						]"
						variant="text"
						:color="
							isCorrectRoute(data.url) || isSubnavActive
								? 'deep-orange-darken-3'
								: isHovering
								? 'primary'
								: isDark
								? 'grey-lighten-4'
								: 'dark-grey'
						"
						outlined
						rounded="lg"
						v-bind="hoverProps"
						@click="showSubNav = !showSubNav"
					>
						{{ props.isExpand ? data.name : '' }}
						<v-icon
							v-if="hasSubnav && props.isExpand"
							:icon="mdiChevronUp"
							:class="{ rotate: showSubNav }"
							class="nav-caret"
						/>
					</atom-btn>
				</atom-link>
				<div
					v-if="hasSubnav"
					:class="{ 'subnav-show': showSubNav }"
					class="subnav my-1 rounded-lg"
					v-bind="hoverProps"
				>
					<template
						v-for="subnav in data.sub"
						:key="subnav.url"
					>
						<molecule-sidebar-subnav-item
							v-if="subnav.sidebar"
							:data="subnav"
							:is-expand="isExpand"
							:check-correct-route-fn="isCorrectRoute"
						/>
					</template>
				</div>
			</template>
		</v-hover>
	</div>
</template>

<script lang="ts" setup>
import { mdiChevronUp } from '@mdi/js'

import { NavItem } from '~/types'

interface NavProps {
	data: NavItem
	isExpand: boolean
}

const route = useRoute()
const props = defineProps<NavProps>()
const { isDark } = storeToRefs(useThemeUtil())
const { $getAbility } = useNuxtApp()
const { can } = $getAbility()

const showSubNav = ref(!!props.data.sub?.some(nav => nav.url === route.path))

const isSubnavActive = computed(() => {
	return !!props.data.sub?.some(nav => nav.url === route.path)
})
const hasSubnav = computed(() => props.data.sub && props.data.sub.length > 0)

const isCorrectRoute = (path?: string) => {
	if (!path) return false
	return new RegExp(`(^${path}\$)|(^${path}[/?]\$)`).test(route.path)
}

const isDisabled = computed(() => {
	if (props.data.disabled) return true
	if (props.data.subject) {
		return !can('read', props.data.subject)
	}
	if (
		props.data.sub &&
		Array.isArray(props.data.sub) &&
		props.data.sub.length
	) {
		const subSubjects = props.data.sub
			.map(item => item.subject)
			.filter(item => !!item)
		return subSubjects.every(item => !can('read', item))
	}
	return false
})
</script>

<style lang="scss" scoped>
.router-link-exact-active {
	.nav__item {
		background-color: rgba(var(--v-theme-primary), 0.3);
	}
}
.nav {
	$padding-x: 14px;
	padding-left: $padding-x;
	padding-right: $padding-x - $scrollbar-width;
	&__item {
		display: flex;
		justify-content: flex-start;
		overflow: hidden;
		width: 100%;
		height: 3rem;
		border-radius: 0.75rem !important;
		z-index: 9999;
		padding: 0 18px;
		:deep(.v-btn__content) {
			font-weight: 500;
		}
		&.subnav-active {
			background-color: rgba(var(--v-theme-primary-darken), 0.1);
			pointer-events: none;
			:deep(.v-btn__content) {
				font-weight: bold;
			}
		}

		:deep(.v-icon) {
			margin: 0 8px;
		}
	}
	&-caret {
		transition: transform 200ms;
		position: absolute;
		right: 6px;
		&.rotate {
			transform: rotateZ(-180deg);
		}
	}

	&.disabled {
		pointer-events: none;
		.nav__item {
			opacity: 0.3;
		}
	}
}

.subnav {
	max-height: 0;
	transition: max-height 400ms ease-in-out;
	overflow: hidden;
	background-color: rgba(var(--v-theme-background), 0.5);
	&.subnav-show {
		max-height: 300px;
		.subnav-link {
			display: block;
			animation: float-to-left 200ms ease-out forwards;
			visibility: hidden;
			transform: translateX(40px);
			@for $var from 1 through 10 {
				&:nth-of-type(#{$var}) {
					animation-delay: #{($var - 1) * 150}ms;
				}
			}
			.subnav-item {
				padding-left: 18px;
			}
		}
	}
}
</style>
