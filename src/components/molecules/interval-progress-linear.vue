<template>
	<atom-progress-linear
		:indeterminate="isProcessing"
		color="primary"
		class="interval-progress-linear"
		:class="{ show: isProcessing }"
	/>
</template>

<script lang="ts" setup>
import { PROGRESS_LINEAR_CYCLE_TIME } from '~/constants'

interface Props {
	loading: boolean
	duration?: number
}

const props = withDefaults(defineProps<Props>(), {
	duration: PROGRESS_LINEAR_CYCLE_TIME / 2,
})
const isProcessing = ref(false)
let intervalLoading: NodeJS.Timer

watch(
	() => props.loading,
	newValue => {
		if (newValue) {
			isProcessing.value = true
			intervalLoading = setInterval(() => {
				if (!props.loading) {
					isProcessing.value = false
				}
			}, props.duration)
		}
	}
)
watch(isProcessing, newValue => {
	if (!newValue) {
		clearInterval(intervalLoading)
	}
})
</script>

<style lang="scss" scoped>
.interval-progress-linear {
	opacity: 0;
	transition: opacity 1s;
	&.show {
		opacity: 1;
	}
}
</style>
