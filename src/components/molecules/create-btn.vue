<template>
	<atom-button
		class="create-button font-weight-medium"
		color="primary"
		@click="$emit('click')"
	>
		<v-icon
			:icon="mdiPlusThick"
			class="text-sm"
		/>
		<slot></slot>
	</atom-button>
</template>

<script lang="ts" setup>
import { mdiPlusThick } from '@mdi/js'

defineEmits<{
	(e: 'click'): void
}>()
</script>

<style lang="scss" scoped>
.v-btn.create-button {
	:deep(.v-btn__content) {
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
