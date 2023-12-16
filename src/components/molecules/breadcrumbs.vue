<template>
	<div class="breadcrumb-wrapper d-flex align-center pl-4">
		<v-breadcrumbs
			v-bind="$attrs"
			class="breadcrumbs"
		>
			<template #prepend>
				<atom-link to="/">
					<atom-icon
						class="breadcrumb-home"
						:icon="mdiHome"
						color="grey-darken-2"
						size="small"
					/>
				</atom-link>
			</template>
			<template
				v-for="(item, index) in breadcrumbs.items"
				:key="item.href"
			>
				<v-breadcrumbs-divider>
					<atom-icon
						:icon="mdiChevronRight"
						size="x-small"
						color="grey"
					/>
				</v-breadcrumbs-divider>
				<v-breadcrumbs-item>
					<atom-link
						:to="item.href"
						:class="[
							index === breadcrumbs.items.length - 1
								? ['prevent-event', 'text-grey']
								: [],
						]"
					>
						{{ item.title }}
					</atom-link>
				</v-breadcrumbs-item>
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
const breadcrumbs = useBreadcrumbs()
</script>

<style lang="scss" scoped>
.breadcrumbs {
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
