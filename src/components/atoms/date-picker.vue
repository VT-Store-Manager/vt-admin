<template>
	<date-picker
		v-model="modelValue"
		class="date-picker"
		:class="{ 'full-width': fullWidth }"
		required
		:min-date="now"
	>
		<template #action-extra="{ selectCurrentDate }">
			<v-hover v-slot="{ isHovering, props }">
				<div
					v-bind="props"
					title="Select current date"
					class="font-weight-semibold py-1 cursor-pointer"
					:style="{ margin: '-2px 0' }"
					:class="{ 'bg-grey-lighten-4': isHovering }"
					@click="selectCurrentDate()"
				>
					Select now
				</div>
			</v-hover>
		</template>
	</date-picker>
</template>

<script setup lang="ts">
interface Props {
	fullWidth?: boolean
}

withDefaults(defineProps<Props>(), {
	fullWidth: false,
})
const modelValue = defineModel<Date>({ default: new Date(), local: true })
const now = useNow()
</script>

<style scoped lang="scss">
.date-picker {
	&.full-width {
		:deep(.dp__outer_menu_wrap) {
			width: 100%;
		}
	}
	:deep(.dp__menu) {
		border-radius: 12px;
		overflow: hidden;
	}
}
</style>
