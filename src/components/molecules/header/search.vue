<template>
	<v-text-field
		ref="searchInputRef"
		class="quick-search rounded-pill bg-grey-lighten-2"
		placeholder="Tìm kiếm..."
		bg-color="screen"
		:append-inner-icon="mdiMagnify"
		variant="solo"
		@click:append-inner="onSearch"
		@keydown.enter="onSearch"
	/>
</template>

<script lang="ts" setup>
import { mdiMagnify } from '@mdi/js'

const onSearch = () => {}
</script>

<style lang="scss" scoped>
.quick-search {
	border: 2px solid rgba(var(--v-theme-background), 0.5);
	:deep(.v-field) {
		box-shadow: none;
		border-radius: 9999px;
		width: 12rem;
		transition: width 200ms;
		&.v-field--focused {
			width: 20rem;
		}
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
