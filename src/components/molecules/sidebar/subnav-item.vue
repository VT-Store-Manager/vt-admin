<template>
	<atom-link
		:to="data.url"
		class="subnav-link subnav-wrapper"
		:class="{ disabled: isDisabled }"
	>
		<atom-btn
			:prepend-icon="data.icon"
			variant="text"
			:color="isDark ? 'grey-lighten-4' : 'dark-grey'"
			rounded="lg"
			class="subnav-item"
			:class="{
				'pl-8': isExpand,
				'current-route': checkCorrectRouteFn(data.url),
			}"
		>
			{{ isExpand ? data.name : '' }}
		</atom-btn>
	</atom-link>
</template>

<script lang="ts" setup>
import { SubNavItem } from '~/types'

interface Props {
	data: SubNavItem
	isExpand: boolean
	checkCorrectRouteFn: (path: string) => boolean
}

const props = defineProps<Props>()
const { isDark } = storeToRefs(useThemeUtil())
const { $can } = useNuxtApp()

const isDisabled = computed(() => {
	return !!(
		props.data.disabled ||
		(props.data.subject && !$can('read', props.data.subject))
	)
})
</script>

<style lang="scss" scoped>
.subnav-wrapper {
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
				font-weight: bold;
			}
		}

		:deep(.v-icon) {
			margin: 0 10px;
		}

		&:hover {
			background-color: transparent;
			:deep(.v-btn__overlay) {
				background-color: rgb(var(--v-theme-primary));
			}
			:deep(*) {
				color: rgb(var(--v-theme-primary));
			}
		}
	}

	&.disabled {
		pointer-events: none;
		.subnav-item {
			opacity: 0.4;
		}
	}
}
</style>
