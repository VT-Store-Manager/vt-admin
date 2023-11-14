<template>
	<div class="input-with-outside-label">
		<atom-label
			:label="label"
			:optional="optional"
			:is-focused="isFocused"
			:for="randomId"
		/>

		<component
			:is="componentName"
			v-bind="$attrs"
			:id="randomId"
			:items="items"
			:error="!!$attrs.errorMessages"
			@update:focused="(value: boolean) => (isFocused = value)"
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
		</component>
	</div>
</template>

<script lang="ts" setup generic="ItemT = any">
import type { VTextField, VSelect, VAutocomplete } from 'vuetify/components'

const inputComponents = {
	'text-field': resolveComponent('atom-text-field'),
	'number-field': resolveComponent('atom-number-field'),
	autocomplete: resolveComponent('atom-autocomplete'),
	textarea: resolveComponent('atom-textarea'),
	select: resolveComponent('atom-select'),
}

interface VTextFieldType extends /* @vue-ignore */ VTextField {}
interface VSelectType extends /* @vue-ignore */ VSelect {}
interface Props {
	inputType?: keyof typeof inputComponents
	label: string
	items?: ItemT[]
	optional?: boolean
}
type Slots = VTextField['$slots'] & VSelect['$slots'] & VAutocomplete['$slots']

defineOptions({
	inheritAttrs: false,
})
defineSlots<Slots>()
const props = withDefaults(
	defineProps<Props & VTextFieldType['$props'] & VSelectType['$props']>(),
	{
		inputType: 'text-field',
		optional: false,
	}
)
const isFocused = ref(false)

const componentName = computed(() => inputComponents[props.inputType])
const randomId = computed(() => temporaryUniqueKey())

const slotNames = Object.keys(useSlots()) as (keyof Slots)[]
</script>

<style lang="scss" scoped></style>
