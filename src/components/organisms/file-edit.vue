<template>
	<div class="image-edit-container d-flex justify-space-between">
		<div class="d-flex mb-2">
			<molecule-input-file-browse
				v-model="browsedFiles"
				:btn-attrs="{
					disabled: isMax,
					...btnAttrs,
				}"
				:max-image="maxFiles"
				class="mr-2"
			/>
			<molecule-input-external-img
				:disabled="isMax"
				:btn-attrs="btnAttrs"
				@add="addExternalImage"
			/>
		</div>
		<v-slot name="restore">
			<molecule-btn-icon-restore
				v-bind="btnAttrs"
				@click="restore"
			/>
		</v-slot>
	</div>
</template>

<script setup lang="ts">
import { AtomBtn } from '#components'

interface Props {
	init: string[]
	maxFiles?: number
	onlyIcon?: boolean
	replace?: boolean
	btnAttrs?: InstanceType<typeof AtomBtn>['$props']
}

const props = withDefaults(defineProps<Props>(), {
	btnAttrs: () => ({}),
})
const browsedFiles = ref<File[]>([])
const files = defineModel<(File | string)[]>({
	default: [],
	local: true,
})

onBeforeMount(() => restore)

const isMax = computed(
	() => !props.replace && props.maxFiles && files.value.length >= props.maxFiles
)

watch(browsedFiles, value => {
	if (!value.length) return

	if (props.replace) {
		files.value = [...value]
	} else {
		value.forEach(file => {
			if (isMax.value) return
			files.value.push(file)
		})
	}
	browsedFiles.value = []
})

const addExternalImage = (imageUrl: string) => {
	if (props.replace) {
		files.value = [imageUrl]
	} else {
		if (isMax.value) return
		files.value.push(imageUrl)
	}
}

const restore = () => {
	files.value = [...props.init]
}
</script>
