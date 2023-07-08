<template>
	<label
		class="outside-label text-14px px-2 pb-1 d-inline-block cursor-pointer transition-color"
		:class="
			isFocused
				? ['text-primary', 'font-weight-semibold']
				: ['font-weight-medium']
		"
	>
		{{ label }}
		<span
			v-if="!optional"
			class="text-red"
		>
			*
		</span>
	</label>
</template>

<script setup lang="ts">
interface Props {
	label: string
	isFocused?: boolean
	optional?: boolean
}

withDefaults(defineProps<Props>(), {
	isFocused: false,
	optional: false,
})
</script>

<style scoped lang="scss"></style>
