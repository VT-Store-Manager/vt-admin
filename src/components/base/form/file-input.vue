<template>
	<v-file-input
		class="custom-file-input"
		v-bind="props"
		variant="outlined"
		color="primary"
	/>
</template>

<script lang="ts" setup>
interface Props {
	label: string
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.custom-file-input {
	:deep(.v-field__outline) {
		.v-field__outline__start {
			border-radius: 12px 0 0 12px;
		}
		.v-field__outline__end {
			border-radius: 0 12px 12px 0;
		}
	}
}
</style>
