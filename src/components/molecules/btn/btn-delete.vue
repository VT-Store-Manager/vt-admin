<template>
	<atom-btn
		v-bind="{ ...$attrs }"
		class="btn-delete font-weight-medium text-white"
		color="red-darken-1"
	>
		<atom-icon
			:icon="disabled ? mdiCancel : mdiTrashCan"
			class="text-sm"
		/>
		<slot></slot>
	</atom-btn>
</template>

<script lang="ts" setup>
import { mdiCancel, mdiTrashCan } from '@mdi/js'

interface Props {
	disabled?: boolean
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.btn-delete {
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
