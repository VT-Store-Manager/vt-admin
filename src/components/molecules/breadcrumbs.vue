<template>
	<div class="breadcrumb-wrapper d-flex align-center pl-4">
		<v-breadcrumbs
			v-bind="$attrs"
			class="breadcrumbs"
		>
			<template #prepend>
				<atom-icon
					class="breadcrumb-home"
					:icon="mdiHome"
					color="grey"
					size="small"
				/>
				<atom-icon
					:icon="mdiChevronRight"
					size="x-small"
					color="grey"
					class="mx-1"
				/>
			</template>
			<template #divider>
				<atom-icon :icon="mdiChevronRight" />
			</template>
		</v-breadcrumbs>
	</div>
</template>

<script lang="ts" setup>
import { mdiChevronRight, mdiHome } from '@mdi/js'

interface Props {
	items?: (string | { title: string; href: string; disabled?: boolean })[]
}

defineOptions({
	inheritAttrs: false,
})
defineProps<Props>()
</script>

<style lang="scss" scoped>
.breadcrumbs {
	.breadcrumb-home {
		transform: translateY(-1px);
	}
	:deep(.v-breadcrumbs-item) {
		font-size: 0.875rem;
		font-weight: 500;
		&:hover {
			text-decoration: none;
			color: $primary-color;
		}
	}
	:deep(.v-breadcrumbs-divider) {
		padding: 0 4px;
		.icon {
			width: 16px;
		}
	}
}
</style>
