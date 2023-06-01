<template>
	<v-img
		v-bind="{ ...$attrs, src: currentSrc }"
		@error="onError"
	>
		<v-slot name="error" />
	</v-img>
</template>

<script lang="ts" setup>
type Props = {
	src: string
	altSrc?: string[]
}

const props = withDefaults(defineProps<Props>(), {
	altSrc: () => []
})

const currentSrc = ref(props.src)
let altSrcIndex = 0

const onError = () => {
	if (altSrcIndex >= props.altSrc.length) return

	currentSrc.value = props.altSrc[altSrcIndex++]
}
</script>
