<template>
	<v-dialog
		v-model="show"
		width="900"
		@update:model-value="$emit('closeModal')"
	>
		<v-card>
			<v-card-title class="font-weight-bold py-4 px-6">
				Add new category
			</v-card-title>
			<v-card-item>
				<div class="d-flex align-start">
					<nuxt-img
						v-if="image && image.length > 0"
						class="mr-4 rounded-lg"
						:src="url"
						fit="outside"
						width="200"
					/>
					<div class="flex-grow-1 d-flex flex-column justify-center">
						<base-form-input
							v-model="categoryName"
							label="Name"
						/>
						<base-form-file-input
							v-model="image"
							label="Category image"
							accept="image/*"
							show-size
							:prepend-inner-icon="mdiImage"
							:rules="categoryImageRule"
							:loading="fileInputLoading"
							@click="fileInputLoading = true"
							@update:model-value="previewImage"
						/>
					</div>
				</div>
			</v-card-item>
			<v-card-actions class="justify-end font-weight-bold py-4 px-6">
				<v-btn
					color="gray"
					@click="$emit('closeModal')"
				>
					Cancel
				</v-btn>
				<v-btn
					color="green"
					variant="tonal"
					@click="$emit('closeModal')"
				>
					Create
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts" setup>
import { mdiImage } from '@mdi/js'

interface Props {
	show?: boolean
}

const props = withDefaults(defineProps<Props>(), { show: false })
defineEmits<{
	(e: 'closeModal'): void
}>()

const categoryName = ref('')
const url = ref('')
const image = ref<File[] | undefined>()
const fileInputLoading = ref(false)

onBeforeUpdate(() => {
	categoryName.value = ''
	url.value = ''
	image.value = undefined
})

const show = ref(props.show)
watch(
	() => props.show,
	() => {
		show.value = props.show
	}
)

const previewImage = () => {
	fileInputLoading.value = false
	if (image.value!.length > 0) url.value = URL.createObjectURL(image.value![0])
	else url.value = ''
}

const categoryImageRule = [
	(value: any) => {
		const size = 1 // Mb
		return (
			!value ||
			!value.length ||
			value[0].size < size * 1024 * 1024 ||
			`Category image size should be less than ${size} MB!`
		)
	}
]
</script>

<style lang="scss" scoped>
.v-card {
	border-radius: 12px !important;
	:deep(.v-card-item__content) {
		overflow: visible;
	}
}
</style>
