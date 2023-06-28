<template>
	<atom-btn
		class="text-capitalize font-weight-bold ml-4"
		min-width="100"
		color="primary"
		variant="elevated"
		flat
		elevation="1"
		:prepend-icon="mdiContentSave"
		:loading="loading"
		:disabled="loading"
	>
		Save
	</atom-btn>
</template>

<script lang="ts" setup>
import { mdiContentSave } from '@mdi/js'

interface Props {
	loading: boolean
}

defineProps<Props>()
</script>
