<template>
	<v-btn-group
		v-bind="$attrs"
		class="btn-group"
	>
		<slot v-if="$slots.default"></slot>
	</v-btn-group>
</template>
