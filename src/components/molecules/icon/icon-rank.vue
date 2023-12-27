<template>
	<div class="rank-icon d-flex align-center">
		<atom-img
			v-if="showIcon"
			:src="data.appearance.icon"
			height="20"
			max-width="20"
			server-img
			placeholder="/img/logo/grey-transparent.svg"
			class="mr-1"
			v-bind="iconProps"
		/>
		<p
			v-if="showName"
			:style="{ color: data.appearance.color }"
			class="text-16px font-weight-bold"
			v-bind="nameProps"
		>
			<slot>
				{{ data.name }}
			</slot>
		</p>
	</div>
</template>

<script lang="ts" setup>
import { RankListItemModel } from '~/models'

interface Props {
	data: Pick<RankListItemModel, 'name' | 'appearance'>
	showName?: boolean
	showIcon?: boolean
	iconProps?: Record<string, any>
	nameProps?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
	iconProps: () => ({}),
	nameProps: () => ({}),
})
</script>
