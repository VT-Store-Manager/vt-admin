<template>
	<div>
		<v-breadcrumbs :items="items">
			<template #divider>
				<v-icon :icon="mdiChevronRight" />
			</template>
		</v-breadcrumbs>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { mdiChevronRight } from '@mdi/js'

type BreadcrumbsItem = {
	title: string
	disabled: boolean
	href: string
}

const items = ref<BreadcrumbsItem[]>([
	{
		title: 'Member',
		disabled: false,
		href: '/member',
	},
	{
		title: 'Ranking',
		disabled: false,
		href: '/member/ranking-setting',
	},
	{
		title: 'Edit',
		disabled: true,
		href: '/member/ranking-setting',
	},
])
</script>

<style lang="scss" scoped>
.v-breadcrumbs {
	:deep(.v-breadcrumbs-item) {
		font-size: 0.875rem;
		font-weight: 500;
	}
	:deep(.v-breadcrumbs-divider) {
		padding: 0 4px;
		.v-icon {
			width: 16px;
		}
	}
}
</style>
