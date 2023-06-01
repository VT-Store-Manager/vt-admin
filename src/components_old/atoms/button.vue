<template>
	<v-btn
		rounded="lg"
		v-bind="$attrs"
		@click="$emit('click')"
	>
		<slot v-if="$slots.default"></slot>
	</v-btn>
</template>

<script lang="ts" setup>
defineOptions({
	inheritAttrs: true
})
defineEmits<{
	(e: 'click'): void
}>()
</script>

<style lang="scss" scoped></style>
