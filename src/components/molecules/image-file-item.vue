<template>
	<v-sheet
		class="image-file-item d-flex align-center pa-3"
		rounded="lg"
	>
		<atom-img
			:src="getFileURL(file)"
			max-width="50"
			class="rounded-lg"
		/>
		<div class="file-detail pl-3 overflow-hidden">
			<p class="file-name text-14px overflow-hidden">{{ file.name }}</p>
			<p class="file-size text-14px">{{ readableFileSize(file.size) }}</p>
		</div>
		<div class="file-actions ml-auto pl-3">
			<v-btn
				:icon="mdiClose"
				variant="text"
				size="x-small"
				color="danger"
				@click="$emit('deleteItem')"
			/>
		</div>
	</v-sheet>
</template>

<script setup lang="ts">
import { mdiClose } from '@mdi/js'

interface Props {
	file: File
}

defineProps<Props>()
defineEmits<{
	(e: 'deleteItem'): any
}>()
const getFileURL = (file: File) => URL.createObjectURL(file)
</script>

<style lang="scss" scoped>
.image-file-item {
	border: 1px solid #e0e0e0;
	.file-name {
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}
</style>
