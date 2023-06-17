<template>
	<div class="file-browse">
		<atom-file-input
			ref="fileInputRef"
			v-model="newFiles"
			class="d-none"
			accept="image/*"
			multiple
			:rules="rule"
			:disabled="isDisabled"
			v-bind="fileInputAttrs"
		/>
		<atom-btn
			:disabled="isDisabled"
			color="warning"
			class="font-weight-bold"
			v-bind="btnAttrs"
			@click="onChooseFile"
		>
			Choose
		</atom-btn>
	</div>
</template>

<script setup lang="ts">
import type { VFileInput } from 'vuetify/components'
import { AtomFileInput, AtomBtn } from '#components'

interface Props {
	maxSize?: number
	maxImage?: number
	fileInputAttrs?: VFileInput['$props']
	btnAttrs?: InstanceType<typeof AtomBtn>['$props']
}

const props = withDefaults(defineProps<Props>(), {
	maxSize: 2,
	maxImage: 4,
	fileInputAttrs: () => ({}),
})

const modelValue = defineModel<File[]>({ default: () => [] })
const newFiles = ref<File[]>([])
const fileInputRef = ref<InstanceType<typeof AtomFileInput>>()
const rule = [
	(value: any[]) => {
		return (
			!value ||
			!value.length ||
			value[0].size < props.maxSize * 1024 * 1024 ||
			'Image size should be less than 2 MB!'
		)
	},
]
watch(newFiles, () => {
	if (!newFiles.value.length) return

	modelValue.value = [
		...modelValue.value,
		...newFiles.value.slice(0, props.maxImage - modelValue.value.length),
	]
	newFiles.value = []
})

const onChooseFile = () => {
	if (!fileInputRef.value) return
	fileInputRef.value.openFileBrowse()
}
const isDisabled = computed(() => {
	return modelValue.value.length >= props.maxImage
})
</script>

<style scoped></style>
