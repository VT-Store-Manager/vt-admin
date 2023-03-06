<template>
	<v-card>
		<v-card-title class="d-flex align-center pb-0">
			<p>{{ props.title }}</p>
		</v-card-title>
		<v-card-subtitle>
			<p>{{ `${imageFiles.length}/${maxImages} images` }}</p>
		</v-card-subtitle>
		<v-card-item class="pa-0">
			<v-file-input
				ref="inputFile"
				v-model="imageFileTempo"
				class="d-none"
				accept="image/*"
				multiple
				:rules="rule"
				@update:model-value="onUpdatedFile"
			/>
			<v-container fluid>
				<v-row dense>
					<v-col
						v-for="(file, index) in imageFiles"
						:key="file.size"
						xl="3"
						lg="4"
						md="6"
						sm="12"
						cols="6"
						class="pa-2"
					>
						<div class="image-input input-added bg-grey-lighten-2">
							<KeepAlive>
								<v-img
									class="image-input__thumbnail"
									:src="imagesUrl[index]"
									cover
								>
									<template #placeholder>
										<div class="d-flex align-center justify-center fill-height">
											<v-progress-circular
												color="grey-lighten-4"
												indeterminate
											/>
										</div>
									</template>
								</v-img>
							</KeepAlive>
							<v-icon
								icon="fa:fas fa-circle-minus"
								color="red-lighten-2"
								size="small"
								class="image-input__delete"
								@click="deleteImage"
							/>
						</div>
					</v-col>
					<v-col
						v-if="imageFiles.length < props.maxImages"
						xl="3"
						lg="4"
						md="6"
						sm="12"
						cols="6"
						class="pa-2"
					>
						<div
							class="image-input input-add bg-green-lighten-4"
							@click="addImage"
						>
							<v-icon
								icon="fa:fas fa-circle-plus"
								color="grey-lighten-5"
								size="x-large"
							/>
						</div>
					</v-col>
					<template v-if="imageFiles.length + 1 < props.maxImages">
						<v-col
							v-for="i in props.maxImages - 1 - imageFiles.length"
							:key="i"
							xl="3"
							lg="4"
							md="6"
							sm="12"
							cols="6"
							class="pa-2"
						>
							<div class="image-input input-empty bg-grey-lighten-3"></div>
						</v-col>
					</template>
				</v-row>
			</v-container>
		</v-card-item>
	</v-card>
</template>

<script lang="ts" setup>
interface Props {
	maxImages: number
	maxSize?: number // MB
	title?: string
}

const props = withDefaults(defineProps<Props>(), {
	maxSize: 2,
	title: 'Images'
})

const imageFiles = ref<File[]>([])
const imageFileTempo = ref<File[]>([])
const inputFile = ref<null | HTMLDivElement>(null)

defineEmits<{
	(e: 'save', files: File[]): void
}>()
defineExpose({ imageFiles })

const rule = [
	(value: any[]) => {
		return (
			!value ||
			!value.length ||
			value[0].size < props.maxSize * 1024 * 1024 ||
			'Image size should be less than 2 MB!'
		)
	}
]

const imagesUrl = computed(() => {
	return imageFiles.value.map(file => URL.createObjectURL(file))
})

const deleteImage = (index: number) => {
	imageFiles.value.splice(index, 1)
}

const addImage = () => {
	inputFile.value?.click()
}

const onUpdatedFile = () => {
	imageFiles.value.splice(
		imageFiles.value.length,
		0,
		...imageFileTempo.value.slice(0, props.maxImages - imageFiles.value.length)
	)
	imageFileTempo.value = []
}
</script>

<style lang="scss" scoped>
.image-input {
	border-radius: 1rem;
	padding-top: 120px;
	position: relative;
	cursor: pointer;
	overflow: hidden;
	&:hover {
		opacity: 0.8;
	}
	> *:first-child {
		position: absolute;
	}
	&.input-added {
		.v-icon {
			position: absolute;
			top: 10px;
			right: 10px;
		}
	}
	&.input-add {
		border: 2px solid #66bb6a;
		> * {
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
	&.input-empty {
		border: 2px dashed #ccc;
	}

	&__thumbnail {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	&__delete {
		z-index: 10;
	}
}
</style>
