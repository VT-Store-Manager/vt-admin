<template>
	<v-badge
		v-bind="$attrs"
		class="badge"
	>
		<slot v-if="$slots.default"></slot>
		<slot v-if="$slots.badge"></slot>
	</v-badge>
</template>
