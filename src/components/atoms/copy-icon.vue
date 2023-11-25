<template>
	<v-hover>
		<template #default="{ isHovering, props: _hoverProps }">
			<v-icon
				v-if="isCopied"
				color="green"
				:icon="mdiCheck"
				size="small"
				class="ml-1"
			/>
			<v-icon
				v-else
				v-bind:="{ ..._hoverProps, ...$attrs }"
				:icon="mdiContentCopy"
				size="small"
				class="transition-all cursor-pointer ml-1"
				:color="isHovering ? 'grey-darken-4' : 'grey'"
				@click="onCopy"
			/>
		</template>
	</v-hover>
</template>

<script setup lang="ts">
import { mdiContentCopy, mdiCheck } from '@mdi/js'

interface Props {
	content: string
}
defineOptions({
	inheritAttrs: false,
})
const props = defineProps<Props>()
const isCopied = ref(false)
const copyThrottle = 1200

const onCopy = useThrottleFn(async () => {
	await navigator.clipboard.writeText(props.content)
	isCopied.value = true
	setTimeout(() => {
		isCopied.value = false
	}, 5000)
}, copyThrottle)
</script>

<style scoped></style>
