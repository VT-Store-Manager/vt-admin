<template>
	<template-page-container page-name="Member list">
		<div>This is member list content</div>
	</template-page-container>
</template>

<script lang="ts" setup>
import { useSeoMeta } from '~~/.nuxt/imports'

useSeoMeta({
	title: 'Member list',
})
</script>
