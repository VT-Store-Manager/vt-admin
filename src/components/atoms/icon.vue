<template>
	<v-icon
		v-bind="$attrs"
		class="icon"
	>
		<slot v-if="$slots.default"></slot>
	</v-icon>
</template>
