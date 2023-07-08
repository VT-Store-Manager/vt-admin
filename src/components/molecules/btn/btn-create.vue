<template>
	<atom-btn
		v-bind="{ ...$attrs }"
		class="btn-create font-weight-medium"
		color="primary"
	>
		<atom-icon
			:icon="mdiPlusThick"
			class="text-sm"
		/>
		<slot></slot>
	</atom-btn>
</template>

<script lang="ts" setup>
import { mdiPlusThick } from '@mdi/js'
</script>

<style lang="scss" scoped>
.btn-create {
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
