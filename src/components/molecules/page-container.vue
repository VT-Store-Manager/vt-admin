<template>
	<div class="page bg-screen">
		<div class="page-title d-flex justify-space-between align-center">
			<div class="page-title__left d-flex align-center">
				<h2 class="page-title__name">
					{{ pageName }}
				</h2>
				<template v-if="$slots.subtitle">
					<atom-divider
						class="mx-4"
						vertical
					/>
					<slot name="subtitle"></slot>
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
</script>

<style lang="scss" scoped>
.page {
	flex: 1;
	padding: 0 1.5rem 1rem;
	border-top-left-radius: 20px;
	display: flex;
	flex-direction: column;
	&-title {
		padding: 1.5rem 0 1rem;
		&__left {
			:deep(*) {
				line-height: 32px;
			}
			[class*='__name'] {
				font-size: 22px;
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
