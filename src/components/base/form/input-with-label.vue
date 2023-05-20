<template>
	<v-label :label="label" />
	<v-text-field
		:model-value="modelValue"
		@update:model-value="$emit('update:modelValue')"
	/>
</template>

<script lang="ts" setup>
interface Props {
	label: string
	modelValue: string | number
}

defineProps<Props>()
defineEmits<(e: 'update:modelValue', value: string) => void>()
</script>
