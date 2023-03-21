<template>
	<v-card>
		<v-card-title class="d-flex align-center pb-0">
			<p>
				{{ props.title }}
				<span class="text-red">*</span>
			</p>
		</v-card-title>
		<v-card-subtitle>
			<p>
				{{ `${images.length}/${maxImages} images` }}
			</p>
		</v-card-subtitle>
		<p
			v-if="isError"
			class="image-error text-error px-4"
		>
			Require 1 image at least
		</p>
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
						v-for="(file, index) in images"
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
							<v-hover v-slot="{ isHovering, props: hoverProps }">
								<v-icon
									v-bind="hoverProps"
									icon="fa:fas fa-circle-minus"
									:color="isHovering ? 'red-accent-4' : 'grey-darken-1'"
									class="image-input__delete"
									@click="deleteImage(index)"
								/>
							</v-hover>
						</div>
					</v-col>
					<v-col
						v-if="images.length < props.maxImages"
						xl="3"
						lg="4"
						md="6"
						sm="12"
						cols="6"
						class="pa-2"
					>
						<div
							class="image-input input-add"
							:class="[isError ? 'bg-red-lighten-4' : 'bg-green-lighten-4']"
							@click="addImage"
						>
							<v-icon
								icon="fa:fas fa-circle-plus"
								color="grey-lighten-5"
								size="x-large"
							/>
						</div>
					</v-col>
					<template v-if="images.length + 1 < props.maxImages">
						<v-col
							v-for="i in props.maxImages - 1 - images.length"
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
	required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	maxSize: 2,
	title: 'Images',
	required: true
})

const images = ref<File[]>([])
const imageFileTempo = ref<File[]>([])
const inputFile = ref<null | HTMLDivElement>(null)
const isError = ref(false)

defineEmits<{
	(e: 'save', files: File[]): void
}>()

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
	return images.value.map(file => URL.createObjectURL(file))
})

const deleteImage = (index: number) => {
	images.value.splice(index, 1)
}

const addImage = () => {
	inputFile.value?.click()
}

const onUpdatedFile = () => {
	images.value.splice(
		images.value.length,
		0,
		...imageFileTempo.value.slice(0, props.maxImages - images.value.length)
	)
	imageFileTempo.value = []
	if (isError.value && images.value.length) {
		isError.value = false
	}
}

const validate = () => {
	if (!props.required) {
		return true
	}
	if (!images.value.length) {
		isError.value = true
		return false
	}
	return true
}

defineExpose({ images, validate })
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
		transition: all 500ms;
		&.bg-red-lighten-4 {
			border-color: #c62828;
		}
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
		overflow: hidden;
		border-radius: 50%;
		opacity: 0.5;
		transition: all 200ms;
		&:hover {
			opacity: 1;
			overflow: hidden;
			box-shadow: 0 0 5px #f009;
		}
	}
}
.image-error {
	font-size: 0.75rem;
	letter-spacing: 0.4px;
}
</style>
