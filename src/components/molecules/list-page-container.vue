<template>
	<div class="page bg-background">
		<div class="page-title d-flex justify-space-between align-center">
			<div class="page-title__left d-flex align-center">
				<h2 class="page-title__name">
					{{ pageName }}
				</h2>
				<template v-if="$slots.subtitle">
					<atom-divider
						class="mx-4"
						vertical
						thickness="2"
						:color="isLight ? 'grey-darken-3' : 'grey-lighten-5'"
					/>
					<div
						class="page-subtitle"
						:class="[isLight ? 'text-grey-darken-2' : 'text-grey-lighten-1']"
					>
						<slot name="subtitle"></slot>
					</div>
				</template>
			</div>
			<div class="page-title__right">
				<slot name="title-right"></slot>
			</div>
		</div>
		<div class="page-content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

interface Props {
	pageName: string
	pageTitle?: string
}

const props = defineProps<Props>()
defineSlots<{
	subtitle?: (props: {}) => any
	'title-right'?: (props: {}) => any
	default?: (props: {}) => any
}>()

useSeoMeta({
	title: `${props.pageTitle || props.pageName} - VT Admin`,
})

const { isLight } = storeToRefs(useThemeUtil())
</script>

<style lang="scss" scoped>
.page {
	flex: 1;
	padding: 0 1.5rem 1rem;
	border-top-left-radius: 20px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	&-title {
		padding: 1.5rem 0 1rem;
		&__left {
			:deep(*) {
				line-height: 32px;
			}
			[class*='__name'] {
				font-size: 22px;
				transform: translateY(-3px);
			}
			.v-divider {
				border-right-width: 1px;
				margin-top: 6px;
				margin-bottom: 6px;
			}
			> :deep(*:not([class*='__name'])) {
				font-size: 0.875rem;
				font-weight: 600;
				color: $grey;
			}
		}
	}
	&-content {
		flex: 1;
		position: relative;
		overflow: hidden;
	}

	:deep(.v-progress-circular) {
		svg {
			animation-duration: 800ms;
		}
		&.done {
			animation: fade 400ms linear 500ms forwards reverse;
			display: inline-flex !important;
		}
	}
}
</style>