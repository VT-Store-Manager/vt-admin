<template>
	<v-hover>
		<template #default="{ isHovering, props }">
			<v-text-field
				v-bind="{ ...props, ...$attrs }"
				v-model="modelValue"
				variant="outlined"
				color="primary"
				type="number"
				step="1000"
				:bg-color="modelValue || isHovering ? 'white' : bgColor"
				:base-color="isHovering ? 'primary' : 'black'"
				class="text-field transition-background-color-all"
				rounded="12"
				@update:focused="value => (bgColor = value ? 'white' : 'input')"
			/>
		</template>
	</v-hover>
</template>

<script lang="ts" setup>
defineOptions({
	inheritAttrs: false,
})

const bgColor = ref('input')
const modelValue = defineModel<string>('')
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
