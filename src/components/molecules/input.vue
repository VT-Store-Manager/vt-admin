<template>
	<div class="input-with-outside-label">
		<label
			:for="randomId"
			class="outside-label text-14px px-2 pb-1 d-inline-block cursor-pointer transition-color"
			:class="
				isFocused
					? ['text-primary', 'font-weight-semibold']
					: ['font-weight-medium']
			"
		>
			{{ label }}
		</label>
		<component
			:is="componentName"
			v-bind="$attrs"
			:id="randomId"
			@update:focused="(value: boolean) => (isFocused = value)"
		>
			<slot v-if="$slots['default']"></slot>
			<template
				v-if="$slots['prepend-item']"
				#prepend-item
			>
				<slot name="prepend-item"></slot>
			</template>
		</component>
	</div>
</template>

<script lang="ts" setup>
import type { VInput } from 'vuetify/components'

const inputComponents = {
	'text-field': resolveComponent('atom-text-field'),
	'number-field': resolveComponent('atom-text-field'),
	autocomplete: resolveComponent('atom-autocomplete'),
	textarea: resolveComponent('atom-textarea'),
	'select-multi': resolveComponent('atom-select-multi'),
}

interface VInputType extends /* @vue-ignore */ VInput {}
interface Props {
	inputType?: keyof typeof inputComponents
	label: string
}

defineOptions({
	inheritAttrs: false,
})
const props = withDefaults(defineProps<Props & VInputType['$props']>(), {
	inputType: 'text-field',
})
const isFocused = ref(false)

const componentName = computed(() => inputComponents[props.inputType])
const randomId = computed(() => temporaryUniqueKey())
</script>

<style lang="scss" scoped></style>
