<template>
	<v-hover v-if="options.length">
		<template #default="{ isHovering, props }">
			<v-radio-group
				v-bind="{ ...props, ...$attrs }"
				v-model="modelValue"
				:bg-color="$attrs.modelValue || isHovering ? 'white' : bgColor"
				@update:focused="value => (bgColor = value ? 'white' : 'input')"
			>
				<v-radio
					v-for="option in options"
					:key="option.value"
					:label="option.label"
					:value="option.value"
					:class="[
						{
							'mr-3': $attrs['inline'],
						},
						option.value === modelValue
							? ['font-weight-semibold', 'opacity-10-deep']
							: [],
					]"
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
				</v-radio>
			</v-radio-group>
		</template>
	</v-hover>
</template>

<script setup lang="ts">
import type { VRadio } from 'vuetify/components'

type Slots = VRadio['$slots']

defineOptions({
	inheritAttrs: false,
})
withDefaults(
	defineProps<{
		options?: { label: string; value: any; icon?: string }[]
	}>(),
	{
		options: () => [],
	}
)
const slotNames = Object.keys(useSlots()) as (keyof Slots)[]

const modelValue = defineModel({ local: true })

const bgColor = ref('input')
</script>

<style scoped></style>
