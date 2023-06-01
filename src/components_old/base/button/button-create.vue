<template>
	<v-btn
		class="create-button"
		rounded="lg"
		color="primary"
		@click="$emit('click')"
	>
		<v-icon :icon="mdiPlusThick" />
		<slot></slot>
	</v-btn>
</template>

<script lang="ts" setup>
import { mdiPlusThick } from '@mdi/js'

defineEmits<{
	(e: 'click'): void
}>()
</script>

<style lang="scss" scoped>
.v-btn.create-button {
	height: 2.5rem;
	:deep(.v-btn__content) {
		text-transform: none;
		line-height: 1.25;
		font-weight: 600;
		font-size: 0.8125rem;
	}
	.v-icon {
		font-size: 0.8125rem;
		margin-right: 4px;
	}
}
</style>
