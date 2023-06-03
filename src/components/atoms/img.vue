<template>
	<v-img
		v-bind="$attrs"
		:src="formattedSrc"
		class="img"
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
			v-if="placeholder"
			#placeholder
		>
			<div class="d-flex align-center justify-center fill-height">
				<v-progress-circular
					color="grey-lighten-4"
					indeterminate
				/>
			</div>
		</template>
	</v-img>
</template>

<script lang="ts" setup>
type Props = {
	src: string
	altSrc?: string[]
	placeholder?: boolean
	serverImg?: boolean
	serverAltImg?: number[]
}

const props = withDefaults(defineProps<Props>(), {
	altSrc: () => [],
	placeholder: false,
	serverImg: false,
	serverAltImg: () => [],
})
const serverImgUrl = useRuntimeConfig().public.imgResourceUrl

const formattedSrc = computed(() => {
	return props.serverImg ? serverImgUrl + props.src : props.src
})
const rightAltSrc = computed(() => {
	const altSrc = props.altSrc
	props.serverAltImg.forEach(srcIndex => {
		if (srcIndex < 0 || srcIndex >= altSrc.length) {
			return
		}
		altSrc[srcIndex] = serverImgUrl + altSrc[srcIndex]
	})
	return altSrc
})
</script>

<style lang="scss" scoped>
.img {
	transition: all 0.2s;
	&:hover {
		opacity: 0.7;
	}
}
</style>
