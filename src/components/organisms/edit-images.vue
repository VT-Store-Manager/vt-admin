<template>
	<atom-labeled-sheet
		label="Images"
		class="pt-8 pb-6 d-flex flex-column"
	>
		<organism-file-edit
			v-model="images"
			:init="initImages"
			:max-files="maxFiles"
			class="mt-2"
		/>
		<p class="text-14px text-grey font-weight-medium text-right mb-2">
			{{ images.length }}/{{ maxFiles }} images
		</p>
		<div class="flex-grow-1">
			<draggable
				v-model="images"
				tag="v-row"
				:component-data="{
					dense: true,
				}"
			>
				<template #item="{ element: image, index }">
					<v-col
						cols="6"
						class="relative rounded"
					>
						<atom-img
							class="rounded small-img-shadow cursor-move small-img-shadow"
							:src="image"
							:aspect-ratio="2"
							:height="120"
							cover
						/>
						<div
							class="absolute d-flex flex-column"
							:style="{
								top: '10px',
								left: '10px',
							}"
						>
							<v-chip
								v-if="index === 0"
								density="comfortable"
								color="blue-darken-2"
								variant="elevated"
								class="font-weight-bold px-2 text-12px mb-1 w-fit"
							>
								Main
							</v-chip>
							<v-chip
								v-if="detectImageType(image) === ImageType.FILE"
								density="comfortable"
								color="red-darken-2"
								variant="elevated"
								class="font-weight-bold px-2 text-12px mb-1 w-fit"
							>
								File
							</v-chip>
							<v-chip
								v-else-if="detectImageType(image) === ImageType.EXTERNAL"
								density="comfortable"
								color="deep-purple-darken-2"
								variant="elevated"
								class="font-weight-bold px-2 text-12px mb-1 w-fit"
							>
								External
							</v-chip>
							<v-chip
								v-if="!initImages.includes(image)"
								density="comfortable"
								color="green-darken-1"
								variant="elevated"
								class="font-weight-bold px-2 text-12px mb-1 w-fit"
							>
								New
							</v-chip>
						</div>
						<div
							class="absolute d-flex rounded-pill"
							:style="{
								top: '7px',
								right: '7px',
								background: 'radial-gradient(white 50%, transparent 50%)',
							}"
						>
							<v-hover>
								<template #default="{ props: hoverProps, isHovering }">
									<v-icon
										class="cursor-pointer transition-all"
										v-bind="hoverProps"
										:icon="mdiMinusCircle"
										:color="isHovering ? 'red-darken-2' : 'grey'"
										:size="28"
										@click="onDelete(index)"
									/>
								</template>
							</v-hover>
							<v-tooltip
								activator="parent"
								location="bottom right"
							>
								Delete image
							</v-tooltip>
						</div>
					</v-col>
				</template>
			</draggable>
		</div>
		<div class="d-flex justify-end mt-4">
			<molecule-btn-save-dialog
				:disabled="isEqual(images, initImages)"
				:loading="pending"
				v-bind="isEqual(images, initImages) ? { color: 'grey' } : {}"
				@click="onSave"
			>
				Save
			</molecule-btn-save-dialog>
		</div>
	</atom-labeled-sheet>
</template>

<script setup lang="ts">
import isEqual from 'lodash/isEqual'
import { mdiMinusCircle } from '@mdi/js'

interface Props {
	initImages: string[]
	maxFiles?: number
	pending?: boolean
}

const props = defineProps<Props>()
const delayPending = ref(props.pending)
const images = ref<(File | string)[]>([...props.initImages])
const emits = defineEmits<(e: 'save', images: (File | string)[]) => void>()

watchThrottled(
	() => props.pending,
	value => {
		delayPending.value = value
	},
	{ throttle: 1000 }
)

const onSave = () => {
	emits('save', images.value)
}

const onDelete = (index: number) => {
	images.value.splice(index, 1)
}
</script>

<style scoped></style>
