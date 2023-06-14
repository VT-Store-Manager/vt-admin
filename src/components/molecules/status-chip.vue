<template>
	<v-chip
		size="small"
		variant="elevated"
		:color="
			status === Status.ACTIVE
				? 'green-lighten-1'
				: status === Status.DISABLED
				? 'purple-lighten-3'
				: 'red-lighten-2'
		"
		v-bind="$attrs"
	>
		{{ status }}
	</v-chip>
</template>

<script lang="ts" setup>
import { Status } from '~/constants'

interface Props {
	status: Status
}

defineProps<Props>()
</script>
