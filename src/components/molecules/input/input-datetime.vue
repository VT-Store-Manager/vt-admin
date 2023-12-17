<template>
	<v-menu>
		<template #activator="{ props: activatorProps }">
			<molecule-input
				v-bind="{ ...$attrs, ...activatorProps }"
				:model-value="displayText"
				input-type="text-field"
			/>
		</template>
		<atom-date-picker
			v-model="modelValue"
			v-bind="datePickerProps"
			inline
			auto-apply
			full-width
			class="py-2"
		/>
	</v-menu>
</template>

<script setup lang="ts">
interface Props {
	displayFormat?: string
	datePickerProps?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
	displayFormat: 'dddd, YYYY-MM-DD, HH:mm:ss',
	datePickerProps: () => ({}),
})
defineOptions({
	inheritAttrs: false,
})

const modelValue = defineModel<Date | string | number>({
	default: Date.now(),
	local: true,
})
const { $capitalize, $dayjs } = useNuxtApp()

const displayText = computed(() => {
	const time = $dayjs(new Date(modelValue.value))
	return $capitalize(time.format(props.displayFormat))
})
</script>
