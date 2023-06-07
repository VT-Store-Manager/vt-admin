<template>
	<v-btn
		class="btn-refresh"
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

interface Props {
	loading?: boolean
}

withDefaults(defineProps<Props>(), { loading: false })
const isDisabled = ref(false)
const emits = defineEmits<{
	(e: 'click'): void
}>()

const throttleDuration = 500
const onClick = () => {
	isDisabled.value = true

	setTimeout(() => {
		isDisabled.value = false
	}, throttleDuration)

	emits('click')
}
</script>

<style lang="scss" scoped>
.btn-refresh {
	width: 2.25rem;
	height: 2.25rem;
}
</style>
