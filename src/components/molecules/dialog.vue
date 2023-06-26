<template>
	<v-dialog
		v-model="modelValue"
		z-index="99999"
		v-bind="$attrs"
	>
		<v-sheet
			rounded="12"
			class="ma-auto"
			v-bind="sheetAttrs"
		>
			<atom-card
				v-bind="cardAttrs"
				class="dialog-card"
			>
				<v-card-title
					class="d-flex justify-space-between align-center py-4 px-5"
				>
					<h3>{{ title }}</h3>
					<div class="d-flex align-center justify-end">
						<slot name="headActions"></slot>
						<atom-btn
							v-if="!hideClose"
							icon="fa:fas fa-xmark"
							color="danger"
							variant="tonal"
							density="compact"
							elevation="1"
							@click="onClose"
						/>
					</div>
				</v-card-title>
				<v-card-subtitle v-if="subtitle">
					<span>{{ subtitle }}</span>
				</v-card-subtitle>
				<v-card-item class="dialog-content py-3 px-8">
					<slot v-if="$slots.default"></slot>
					<p v-else>Dialog content</p>
				</v-card-item>
				<v-card-actions class="d-flex justify-end pt-3 px-6 pb-5">
					<slot name="actions"></slot>
				</v-card-actions>
			</atom-card>
		</v-sheet>
	</v-dialog>
</template>

<script setup lang="ts">
import type { VDialog, VCard, VSheet } from 'vuetify/components'

interface VDialogType extends /* @vue-ignore */ VDialog {}
interface VCardType extends /* @vue-ignore */ VCard {}
interface VSheetType extends /* @vue-ignore */ VSheet {}
interface Props {
	cardAttrs?: VCardType['$props']
	sheetAttrs?: VSheetType['$props']
	title: string
	subtitle?: string
	hideClose?: boolean
}

withDefaults(defineProps<VDialogType['$props'] & Props>(), {
	cardAttrs: () => ({}),
	sheetAttrs: () => ({}),
	hideClose: false,
})
defineSlots<{
	default: (props: any) => any
	headActions?: (props: any) => any
	actions?: (props: any) => any
}>()
const emits = defineEmits<{
	(e: 'close'): any
}>()
const modelValue = defineModel({ local: true, default: false })

const onClose = () => {
	modelValue.value = false
	emits('close')
}
</script>

<style lang="scss" scoped>
.dialog-card {
	padding: 0 !important;
}
.dialog-content {
	> :deep(.v-card-item__content) {
		overflow: visible;
	}
}
</style>
