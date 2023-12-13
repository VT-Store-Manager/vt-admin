<template>
	<div class="image-edit-container">
		<div class="d-flex justify-space-between">
			<div class="d-flex mb-2">
				<molecule-input-file-browse
					v-model="browsedFiles"
					:btn-attrs="{
						disabled: isMax,
					}"
					:max-image="maxFiles"
					class="mr-2"
				/>
				<molecule-input-external-img
					:disabled="isMax"
					@add="addExternalImage"
				/>
			</div>
			<atom-btn
				size="small"
				:flat="true"
				variant="tonal"
				class="font-weight-bold"
				@click="restore"
			>
				<v-icon icon="fa:fas fa-arrow-rotate-left" />
			</atom-btn>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	init: string[]
	maxFiles?: number
}

const props = defineProps<Props>()
const browsedFiles = ref<File[]>([])
const files = defineModel<(File | string)[]>({
	default: [],
	local: true,
})

onBeforeMount(() => restore)

const isMax = computed(
	() => props.maxFiles && files.value.length >= props.maxFiles
)

watch(browsedFiles, value => {
	value.forEach(file => {
		if (isMax.value) return
		files.value.push(file)
	})
	browsedFiles.value = []
})

const addExternalImage = (imageUrl: string) => {
	if (isMax.value) return
	files.value.push(imageUrl)
}

const restore = () => {
	files.value = [...props.init]
}
</script>
