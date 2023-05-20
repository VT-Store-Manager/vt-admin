<template>
	<v-text-field
		class="custom-input"
		variant="outlined"
		color="primary"
	/>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.custom-input {
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
