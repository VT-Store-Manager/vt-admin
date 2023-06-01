<template>
	<div
		v-if="$router.currentRoute.value.path !== '/'"
		class="d-flex align-center pl-4"
	>
		<atom-link url="/">
			<v-hover v-slot="{ isHovering, props }">
				<v-icon
					class="breadcrumb-home"
					v-bind="props"
					:icon="mdiHome"
					:color="isHovering ? 'primary' : 'grey'"
					size="small"
				/>
			</v-hover>
		</atom-link>
		<v-icon
			:icon="mdiChevronRight"
			size="x-small"
			color="grey"
			class="mx-1"
		/>
		<v-breadcrumbs
			:items="breadcrumbs.items"
			class="pl-0"
		>
			<template #divider>
				<v-icon
					:icon="mdiChevronRight"
					color="grey"
				/>
			</template>
		</v-breadcrumbs>
	</div>
</template>

<script lang="ts" setup>
import { mdiChevronRight, mdiHome } from '@mdi/js'

const breadcrumbs = useBreadcrumbs()
</script>

<style lang="scss" scoped>
.breadcrumb-home {
	transition: all 0.3s;
	transform: translateY(-2px);
}
.v-breadcrumbs {
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
		.v-icon {
			width: 16px;
		}
	}
}
</style>
