<template>
	<v-select
		v-bind="$attrs"
		class="select"
	>
		<slot v-if="$slots.default"></slot>
	</v-select>
</template>
