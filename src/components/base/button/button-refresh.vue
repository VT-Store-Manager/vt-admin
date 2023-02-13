<template>
	<v-btn
		class="refresh-button"
		rounded="lg"
		:icon="mdiRefresh"
		:disabled="isDisabled || loading"
		:loading="loading"
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
.v-btn.refresh-button {
	width: 2.25rem;
	height: 2.25rem;
}
</style>
