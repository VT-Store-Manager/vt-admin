<template>
	<v-switch
		v-bind="$attrs"
		class="switch"
	>
		<slot
			v-if="$slots.label"
			name="label"
		></slot>
	</v-switch>
</template>
