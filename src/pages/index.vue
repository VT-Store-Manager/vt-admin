<template>
	<template-page-container page-name="Dashboard">
		<div>This is dashboard content</div>
	</template-page-container>
</template>

<script lang="ts" setup>
import { useSeoMeta } from '~~/.nuxt/imports'

useSeoMeta({
	title: 'Dashboard'
})
</script>
