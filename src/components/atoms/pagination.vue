<template>
	<v-pagination
		v-bind="$attrs"
		class="pagination"
	>
		<slot v-if="$slots.default"></slot>
	</v-pagination>
</template>
