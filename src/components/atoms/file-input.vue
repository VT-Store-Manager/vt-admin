<template>
	<v-hover>
		<template #default="{ isHovering, props: hoveringProps }">
			<v-file-input
				ref="fileInputRef"
				v-bind="{ ...hoveringProps, ...$attrs }"
				v-model="modelValue"
				variant="outlined"
				color="primary"
				:bg-color="!isEmpty(modelValue) || isHovering ? 'white' : bgColor"
				:base-color="isHovering ? 'primary' : 'black'"
				class="file-input transition-background-color-all"
				rounded="12"
				@update:focused="value => (bgColor = value ? 'white' : 'input')"
			>
				<template
					v-for="slot in slotNames"
					:key="slot"
					#[slot]
				>
					<slot :name="slot"></slot>
				</template>
			</v-file-input>
		</template>
	</v-hover>
</template>

<script lang="ts" setup>
import isEmpty from 'lodash/isEmpty'
import type { VFileInput } from 'vuetify/components'

interface VFileInputType extends /* @vue-ignore */ VFileInput {}

defineOptions({
	inheritAttrs: false,
})

const fileInputRef = ref<HTMLElement>()
const bgColor = ref('input')
const modelValue = defineModel<File[]>({ default: () => [] })

defineProps<VFileInputType['$props']>()
const slots = useSlots()

const slotNames = computed(
	() => Object.keys(slots) as (keyof VFileInput['$slots'])[]
)

const openFileBrowse = () => {
	fileInputRef.value?.click()
}

defineExpose({
	openFileBrowse,
})
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
