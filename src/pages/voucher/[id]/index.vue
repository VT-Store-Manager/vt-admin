<template>
	<div>Detail {{ voucherId }}</div>
</template>

<script setup lang="ts">
const voucherId = useRoute().params.id as string
</script>

<style scoped></style>
