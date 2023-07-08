<template>
	<v-hover>
		<template #default="{ isHovering, props }">
			<v-autocomplete
				v-bind="{ ...props, ...$attrs }"
				variant="outlined"
				color="primary"
				:bg-color="$attrs.modelValue || isHovering ? 'white' : bgColor"
				:base-color="isHovering ? 'primary' : 'black'"
				class="text-field"
				rounded="12"
				@update:focused="value => (bgColor = value ? 'white' : 'input')"
			>
				<template
					v-for="slot in slotNames"
					:key="slot"
					#[slot]="slotAttr"
				>
					<slot
						:name="slot"
						v-bind="slotAttr"
					></slot>
				</template>
			</v-autocomplete>
		</template>
	</v-hover>
</template>

<script lang="ts" setup>
import type { VAutocomplete } from 'vuetify/components'

type Slots = VAutocomplete['$slots']

defineOptions({
	inheritAttrs: false,
})

const bgColor = ref('input')

const slotNames = Object.keys(useSlots()) as (keyof Slots)[]
</script>

<style lang="scss" scoped>
*,
:deep(*) {
	transition: all 0.3s;
	.v-field__outline__notch {
		transition: none;
	}
}
:deep(.v-field__outline) {
	.v-field__outline__start {
		border-radius: $common-round 0 0 $common-round;
	}
	.v-field__outline__end {
		border-radius: 0 $common-round $common-round 0;
	}
}
</style>
