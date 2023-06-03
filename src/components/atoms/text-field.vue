<template>
	<v-text-field
		v-bind="$attrs"
		class="text-field"
	>
		<slot v-if="$slots.default"></slot>
	</v-text-field>
</template>
