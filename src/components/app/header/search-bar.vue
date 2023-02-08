<template>
	<v-text-field
		class="quick-search"
		placeholder="Quick search..."
		:append-inner-icon="mdiMagnify"
		variant="solo"
	/>
</template>

<script lang="ts" setup>
import { mdiMagnify } from '@mdi/js'
</script>

<style lang="scss" scoped>
.quick-search {
	width: 20rem;
	:deep(.v-field) {
		box-shadow: none;
		background-color: $screen-color;
		border-radius: 9999px;
	}
	:deep(.v-input__details) {
		display: none;
	}
	:deep(.v-field__field) {
		height: 40px;
		align-items: center;
		.v-field__input {
			font-size: 0.875rem;
		}
	}
	:deep(.v-field__append-inner) {
		cursor: pointer;
		padding: 0;
		align-self: center;
	}
}
</style>
