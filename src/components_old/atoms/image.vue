<template>
	<v-img
		:src="currentSrc"
		:alt="alt"
		@error="onError"
	/>
</template>

<script lang="ts" setup>
type Props = {
	src: string
	altSrc?: string[]
	alt?: string
}

const props = withDefaults(defineProps<Props>(), {
	altSrc: () => [],
	alt: ''
})

const currentSrc = ref(props.src)
let altSrcIndex = 0

const onError = () => {
	if (altSrcIndex >= props.altSrc.length) return

	currentSrc.value = props.altSrc[altSrcIndex++]
}
</script>
