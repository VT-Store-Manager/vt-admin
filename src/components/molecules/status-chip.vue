<template>
	<v-chip
		size="small"
		variant="elevated"
		:color="
			statusText === Status.ACTIVE
				? 'green-lighten-1'
				: statusText === Status.DISABLED
				? 'purple-lighten-3'
				: 'red-lighten-2'
		"
		v-bind="$attrs"
	>
		{{ statusText }}
	</v-chip>
</template>

<script lang="ts" setup>
import { Status } from '~/constants'

interface Props {
	status?: Status
	raw?: {
		disabled: boolean
		deleted?: boolean
	}
}

const props = defineProps<Props>()

const statusText = computed<Status>(() => {
	if (props.status) return props.status
	if (props.raw?.deleted) {
		return Status.REMOVED
	} else if (props.raw?.disabled) {
		return Status.DISABLED
	} else {
		return Status.ACTIVE
	}
})
</script>
