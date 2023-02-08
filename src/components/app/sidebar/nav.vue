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
							...(isSubnavActive ? ['subnav-active'] : []),
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
						{{ props.isExpand ? props.text : '' }}
						<v-icon
							v-if="hasSubnav && props.isExpand"
							:icon="mdiChevronUp"
							:class="{ rotate: showSubNav }"
							class="nav-caret"
						/> </v-btn
				></nuxt-link>
				<div
					v-if="hasSubnav"
					:class="{ 'subnav-show': showSubNav }"
					class="subnav my-1 rounded-lg"
					v-bind="hoverProps"
				>
					<v-btn
						v-for="n in props.subnav"
						:key="n.url"
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
								: {}),
						}"
					>
						<nuxt-link :to="n.url">{{
							props.isExpand ? n.text : ''
						}}</nuxt-link></v-btn
					>
				</div>
			</template>
		</v-hover>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Nav } from '~/types'
import { mdiChevronUp } from '@mdi/js'

interface NavProps extends Nav {
	text: string
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
		opacity: 0.7 !important;
		&.current-route {
			opacity: 1 !important;
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
		.subnav-item {
			padding-left: 18px;
			animation: float-to-left 200ms ease-out forwards;
			transform: translateX(60px);
			visibility: hidden;
			@for $var from 1 through 10 {
				&:nth-of-type(#{$var}) {
					animation-delay: #{($var - 1) * 200}ms;
				}
			}
		}
	}
}
</style>
