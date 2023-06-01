<template>
	<v-textarea
		class="custom-textarea"
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
.custom-textarea {
	:deep(.v-field__outline) {
		.v-field__outline__start {
			border-radius: 12px 0 0 12px;
		}
		.v-field__outline__end {
			border-radius: 0 12px 12px 0;
		}
	}
	:deep(textarea::-webkit-resizer) {
		display: none;
	}
}
</style>
