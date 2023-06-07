<template>
	<v-dialog
		v-model="show"
		max-width="900"
		@update:model-value="$emit('closeModal')"
	>
		<v-card>
			<v-card-title class="font-weight-bold py-4 px-6">
				Add new category
				<v-progress-circular
					v-show="createProductCategory.loading"
					:class="{ done: !createProductCategory.loading }"
					class="mr-3"
					indeterminate
					color="primary"
					:size="22"
					:width="3"
				/>
			</v-card-title>
			<v-card-item>
				<div class="d-flex align-start">
					<v-img
						v-if="image && image.length > 0"
						class="mr-4 rounded-lg"
						:src="url"
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
							:prepend-icon="false"
							:rules="categoryImageRule"
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
					@click="onCreateProductCategory"
				>
					Create
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts" setup>
import { mdiImage } from '@mdi/js'
import { useCreateProductCategory } from '~/composables/apis-old/use-create-product-category'

interface Props {
	show?: boolean
}

const props = withDefaults(defineProps<Props>(), { show: false })
const emits = defineEmits<{
	(e: 'closeModal'): void
	(e: 'created'): void
}>()

const categoryName = ref('')
const url = ref('')
const image = ref<File[] | undefined>()
const createProductCategory = useCreateProductCategory()

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
	},
]

const onCreateProductCategory = async () => {
	const formData = new FormData()
	formData.append('image', image.value![0])
	formData.append('name', categoryName.value)

	await createProductCategory.fetch({ body: formData })

	emits('created')
	emits('closeModal')
}
</script>

<style lang="scss" scoped>
.v-card {
	border-radius: 12px !important;
	.v-card-title {
		position: relative;
		.v-progress-circular {
			position: absolute;
			top: 50%;
			right: 32px;
			transform: translate(50%, -50%);
		}
	}
	:deep(.v-card-item__content) {
		overflow: visible;
	}
}
</style>
