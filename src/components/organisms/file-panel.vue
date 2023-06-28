<template>
	<v-sheet
		class="file-panel mt-3"
		:class="{ error }"
	>
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
			<!-- TODO: Update later -->
			<!-- <atom-btn
				class="font-weight-bold ml-2 bg-grey-lighten-1 text-white"
				flat
				size="small"
				tooltip="Update soon"
			>
				Upload
			</atom-btn> -->
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
	error?: boolean
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
		border: 1px solid #bdbdbd;
	}
	&.error {
		.file-control {
			border-top-color: rgb(var(--v-theme-error));
			border-left-color: rgb(var(--v-theme-error));
			border-right-color: rgb(var(--v-theme-error));
		}
		.file-list {
			border-left-color: rgb(var(--v-theme-error));
			border-right-color: rgb(var(--v-theme-error));
			border-bottom-color: rgb(var(--v-theme-error));
		}
	}
	.file-list {
		min-height: 54px;
		border-top: none;
	}
}
</style>
