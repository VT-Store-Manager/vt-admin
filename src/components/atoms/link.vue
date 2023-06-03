<template>
	<nuxt-link
		v-bind="{ ...$attrs, to }"
		class="link"
	>
		<slot v-if="$slots.default"></slot>
	</nuxt-link>
</template>

<script lang="ts" setup>
import { NuxtLinkProps } from 'nuxt/app'

type Props = {
	to: string
}

const props = defineProps<Props & NuxtLinkProps>()
</script>
