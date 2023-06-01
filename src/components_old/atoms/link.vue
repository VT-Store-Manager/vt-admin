<template>
	<nuxt-link :to="url">
		<template v-if="$slots.default">
			<slot></slot>
		</template>
		<span v-else>{{ text }}}</span>
	</nuxt-link>
</template>

<script lang="ts" setup>
import { NuxtLinkProps } from 'nuxt/app'

type Props = {
	text?: string
	url: string
}

const props = defineProps<Props & NuxtLinkProps>()
</script>
