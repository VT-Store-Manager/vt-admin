<template>
	<nuxt-link
		v-bind="{ ...$attrs, to }"
		class="link"
		:class="{ highlight: highlightHover }"
	>
		<slot v-if="$slots.default"></slot>
	</nuxt-link>
</template>

<script lang="ts" setup>
import { NuxtLinkProps } from 'nuxt/app'

type Props = {
	to: string
	highlightHover?: boolean
}

const props = defineProps<Props & NuxtLinkProps>()
</script>

<style lang="scss" scoped>
.link {
	&.highlight:hover {
		color: $primary-color;
	}
}
</style>
