<template>
	<v-badge v-bind="$attrs">
		<v-slot v-if="$slots.default" />
		<v-slot v-if="$slots.badge" />
	</v-badge>
</template>
