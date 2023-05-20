<template>
	<template-page-container page-name="News post">
		<div>This is news content</div>
	</template-page-container>
</template>

<script lang="ts" setup>
import { useSeoMeta } from '~~/.nuxt/imports'

useSeoMeta({
	title: 'News post'
})
</script>
