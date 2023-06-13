<template>
	<v-img
		v-bind="{ ...imgAttribute, src: formattedSrc }"
		class="img overflow-hidden"
	>
		<template
			v-if="rightAltSrc.length"
			#sources
		>
			<source
				v-for="(_src, index) in rightAltSrc"
				:key="index"
				:srcset="_src"
			/>
		</template>
		<template
			v-if="$slots.placeholder"
			#placeholder
		>
			<slot name="placeholder"></slot>
		</template>
		<template
			v-else-if="placeholder === 'logo'"
			#placeholder
		>
			<v-img
				class="default-image-placeholder"
				src="/img/logo/gray.png"
				cover
			/>
		</template>
		<template
			v-else-if="placeholder === 'progress'"
			#placeholder
		>
			<div class="d-flex align-center justify-center fill-height">
				<v-progress-circular
					color="grey-lighten-4"
					indeterminate
				/>
			</div>
		</template>
		<template
			v-else
			#placeholder
		>
			<v-img
				class="default-image-placeholder"
				:src="placeholder"
				cover
			/>
		</template>
	</v-img>
</template>

<script lang="ts" setup>
type Props = {
	src: string
	altSrc?: string[]
	placeholder?: 'progress' | 'logo' | string
	serverImg?: boolean
	serverAltImg?: number[] | true
	imgAttribute?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
	altSrc: () => [],
	serverImg: false,
	serverAltImg: () => [],
})
defineSlots<{
	placeholder?: (props: {}) => any
}>()
const serverImgUrl = useRuntimeConfig().public.imgResourceUrl

const formattedSrc = computed(() => {
	return props.serverImg ? serverImgUrl + props.src : props.src
})
const rightAltSrc = computed(() => {
	let altSrc = props.altSrc
	if (Array.isArray(props.serverAltImg)) {
		props.serverAltImg.forEach(srcIndex => {
			if (srcIndex < 0 || srcIndex >= altSrc.length) {
				return
			}
			altSrc[srcIndex] = serverImgUrl + altSrc[srcIndex]
		})
	} else if (props.serverAltImg === true) {
		altSrc = altSrc.map(src => serverImgUrl + src)
	}
	return altSrc
})
</script>

<style lang="scss" scoped>
.img {
	transition: all 0.3s;
	&:hover {
		opacity: 0.7;
	}
}
</style>
