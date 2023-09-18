<template>
	<v-hover>
		<template #default="{ isHovering, props }">
			<v-text-field
				variant="outlined"
				color="primary"
				bg-color="white"
				:base-color="isHovering ? 'primary' : 'black'"
				class="text-field transition-background-color-all"
				rounded="12"
				v-bind="{ ...props, ...$attrs }"
				@update:focused="onUpdateFocused"
			/>
		</template>
	</v-hover>
</template>

<script lang="ts" setup>
defineOptions({
	inheritAttrs: false,
})

const bgColor = ref('input')

const onUpdateFocused = (value: boolean) => {
	bgColor.value = value ? 'white' : 'input'
}
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
