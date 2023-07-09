<template>
	<v-chip
		size="small"
		variant="elevated"
		:color="chipColor"
		v-bind="$attrs"
		class="text-12px font-weight-semibold"
	>
		{{ status.toUpperCase() }}
	</v-chip>
</template>

<script lang="ts" setup>
import { OrderState } from '~/constants'

interface Props {
	status: OrderState
}

const props = defineProps<Props>()

const chipColor = computed(() => {
	switch (props.status) {
		case OrderState.DONE:
			return 'green-lighten-1'
		case OrderState.CANCELED:
			return 'red-darken-1'
		case OrderState.PROCESSING:
			return 'yellow-darken-4'
		default:
			return 'grey-lighten-1'
	}
})
</script>
