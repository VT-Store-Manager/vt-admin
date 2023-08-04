<template>
	<atom-btn
		v-bind="{ ...$attrs }"
		class="btn-edit font-weight-medium text-white"
		color="orange-darken-1"
	>
		<atom-icon
			icon="fa:far fa-pen-to-square"
			class="text-sm"
		/>
		<slot></slot>
	</atom-btn>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.btn-edit {
	:deep(.v-btn__content) {
		line-height: 1.25;
		font-weight: bold;
		font-size: 0.8125rem;
	}
	.icon {
		font-size: 0.8125rem;
		margin-right: 4px;
	}
}
</style>
