<template>
	<v-sheet class="file-panel mt-3">
		<div class="file-control d-flex pa-4 rounded-t-12 bg-grey-lighten-4">
			<molecule-file-browse
				v-model="files"
				:btn-attrs="{
					color: 'primary',
					size: 'small',
					flat: true,
				}"
				:max-image="maxFiles"
			/>
			<atom-btn
				class="font-weight-bold ml-2 bg-grey-lighten-1 text-white"
				flat
				size="small"
				tooltip="Update soon"
			>
				Upload
			</atom-btn>
			<atom-btn
				class="font-weight-bold ml-auto"
				color="danger"
				variant="text"
				size="small"
				@click="files = []"
			>
				Cancel
			</atom-btn>
		</div>
		<div class="file-list px-4 py-5 rounded-b-12">
			<molecule-image-file-item
				v-for="(file, index) in files"
				:key="index"
				:file="file"
				:class="{ 'mt-2': index > 0 }"
				@delete-item="onDeleteFile(index)"
			/>
		</div>
	</v-sheet>
</template>

<script lang="ts" setup>
interface Props {
	maxFiles?: number
}

defineProps<Props>()
const files = defineModel<File[]>({ default: () => [], local: true })

const onDeleteFile = (index: number) => {
	files.value = files.value.slice(0, index).concat(files.value.slice(index + 1))
}
</script>

<style lang="scss" scoped>
.file-panel {
	.file-control,
	.file-list {
		border: 1px solid #e0e0e0;
	}
	.file-list {
		min-height: 54px;
		border-top: none;
	}
}
</style>
