<template>
	<v-img
		:src="currentSrc"
		:alt="alt"
		@error="onError"
	/>
</template>

<script lang="ts" setup>
import { VImg } from 'vuetify/lib/components/index.mjs'

type Props = {
	src: string
	altSrc?: string[]
	alt?: string
}
type VImgProps = InstanceType<typeof VImg>['$props']

const props = withDefaults(defineProps<Props & VImgProps>(), {
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
