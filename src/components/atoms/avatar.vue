<template>
	<v-avatar
		v-bind="{ size: 40, ...$attrs }"
		class="avatar"
	>
		<slot v-if="$slots.default"></slot>
	</v-avatar>
</template>

<script lang="ts" setup></script>
