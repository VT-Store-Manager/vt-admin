<template>
	<v-hover>
		<template #default="{ isHovering, props }">
			<v-text-field
				variant="outlined"
				color="primary"
				:bg-color="$attrs.modelValue || isHovering ? 'white' : bgColor"
				:base-color="isHovering ? 'primary' : 'black'"
				class="number-field transition-background-color-all"
				rounded="12"
				type="number"
				v-bind="{ ...props, ...$attrs }"
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
:deep(.v-field) {
	input {
		padding-right: 18px;
		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		&[type='number'] {
			-moz-appearance: textfield;
		}
	}
}
</style>
