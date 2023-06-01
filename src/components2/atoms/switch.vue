<template>
	<v-switch v-bind="$attrs">
		<v-slot
			v-if="$slots.label"
			name="label"
		/>
	</v-switch>
</template>
