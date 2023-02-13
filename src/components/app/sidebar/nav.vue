import { NavProps } from '~/types';
<template>
	<div class="nav mb-1">
		<v-hover>
			<template #default="{ isHovering, props: hoverProps }">
				<nuxt-link :to="props.url">
					<v-btn
						:prepend-icon="props.icon"
						class="nav__item"
						:class="[
							isCorrectRoute(props.url)
								? 'font-weight-bold'
								: 'font-weight-medium',
							...(isSubnavActive ? ['subnav-active'] : [])
						]"
						variant="text"
						:color="
							isCorrectRoute(props.url) || isSubnavActive
								? 'primary-darken'
								: isHovering
								? 'primary'
								: 'text-black'
						"
						outlined
						rounded="lg"
						v-bind="hoverProps"
						@click="showSubNav = !showSubNav"
					>
						{{ props.isExpand ? props.name : '' }}
						<v-icon
							v-if="hasSubnav && props.isExpand"
							:icon="mdiChevronUp"
							:class="{ rotate: showSubNav }"
							class="nav-caret"
						/>
					</v-btn>
				</nuxt-link>
				<div
					v-if="hasSubnav"
					:class="{ 'subnav-show': showSubNav }"
					class="subnav my-1 rounded-lg"
					v-bind="hoverProps"
				>
					<nuxt-link
						v-for="n in props.subnav"
						:key="n.url"
						:to="n.url"
						class="subnav-link"
					>
						<v-btn
							:prepend-icon="n.icon"
							variant="text"
							color="text-black-blur"
							rounded="lg"
							class="subnav-item font-weight-medium"
							:class="{
								'pl-8': props.isExpand,
								'font-weight-bold': isCorrectRoute(n.url),
								...(isCorrectRoute(n.url)
									? { 'font-weight-bold': true, 'current-route': true }
									: {})
							}"
						>
							{{ props.isExpand ? n.name : '' }}
						</v-btn>
					</nuxt-link>
				</div>
			</template>
		</v-hover>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { mdiChevronUp } from '@mdi/js'
import { Nav } from '~/types'

interface NavProps extends Nav {
	name: string
	icon?: string
	url?: string
	subnav?: Nav[]
	isExpand: boolean
}

const route = useRoute()
const props = defineProps<NavProps>()

const showSubNav = ref(!!props.subnav?.some(nav => nav.url === route.path))
const isSubnavActive = computed(() => {
	return !!props.subnav?.some(nav => nav.url === route.path)
})
const hasSubnav = computed(() => props.subnav && props.subnav.length > 0)
const isCorrectRoute = (path?: string) => {
	return route.path === path
}
</script>

<style lang="scss" scoped>
.router-link-exact-active {
	.nav__item {
		background-color: $primary-color-lighten-3;
	}
}
.nav {
	$padding-x: 14px;
	padding-left: $padding-x;
	padding-right: $padding-x - $scrollbar-width;
}
.nav__item {
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
		background-color: $primary-color-lighten-3;
	}

	:deep(.v-icon) {
		margin: 0 8px;
	}
}
.nav-caret {
	transition: transform 200ms;
	position: absolute;
	right: 6px;
	&.rotate {
		transform: rotateZ(-180deg);
	}
}

.subnav {
	max-height: 0;
	transition: max-height 400ms ease-in-out;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.03);
	.subnav-item {
		display: flex;
		height: 3rem;
		justify-content: flex-start;
		width: 100%;
		transition: padding-left 100ms;
		&.current-route {
			:deep(.v-icon) {
				color: $primary-color;
			}
			:deep(.v-btn__content) {
				color: $primary-color;
			}
		}

		:deep(.v-icon) {
			margin: 0 6px;
		}

		&:hover {
			background-color: transparent;
			opacity: 1 !important;
			:deep(*) {
				color: $primary-color;
			}
		}
	}

	&.subnav-show {
		max-height: 200px;
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
