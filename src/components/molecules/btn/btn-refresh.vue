<template>
	<v-btn
		class="btn-refresh"
		:class="{ 'is-disabled': isDisabled }"
		rounded="lg"
		:icon="mdiRefresh"
		:disabled="isDisabled || loading"
		:loading="loading"
		v-bind="$attrs"
		@click="onClick()"
	/>
</template>

<script lang="ts" setup>
import { mdiRefresh } from '@mdi/js'
import { PROGRESS_LINEAR_CYCLE_TIME } from '~/constants'

interface Props {
	loading?: boolean
	throttleDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
	loading: false,
	throttleDuration: PROGRESS_LINEAR_CYCLE_TIME,
})
const isDisabled = ref(false)
const emits = defineEmits<{
	(e: 'click'): void
}>()

const onClick = () => {
	isDisabled.value = true

	setTimeout(() => {
		isDisabled.value = false
	}, props.throttleDuration)

	emits('click')
}
</script>

<style lang="scss" scoped>
.btn-refresh {
	width: 2.25rem;
	height: 2.25rem;
	&.is-disabled {
		pointer-events: none;
	}
}
</style>
