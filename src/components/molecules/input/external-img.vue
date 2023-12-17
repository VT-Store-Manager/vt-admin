<template>
	<v-menu
		v-model="show"
		:close-on-content-click="false"
		location="bottom"
	>
		<template #activator="{ props }">
			<atom-btn
				color="primary-darken"
				size="small"
				elevation="1"
				variant="tonal"
				:disabled="disabled"
				:prepend-icon="mdiLink"
				v-bind="{ ...props, ...btnAttrs }"
				class="font-weight-bold"
			>
				URL
			</atom-btn>
		</template>
		<v-sheet
			rounded="12"
			class="px-4 pt-3 pb-4 mt-2"
			min-width="400"
		>
			<molecule-input
				v-model="imageUrl"
				class="input-image-url"
				input-type="textarea"
				label="Enter image URL"
				density="compact"
				placeholder="https://example.com/image.png"
				auto-grow
				rows="1"
				:error-messages="
					error && imageUrl ? 'Please enter an image URL' : undefined
				"
			/>
			<div class="d-flex justify-space-between align-center">
				<div>
					<atom-label
						label="Preview"
						:optional="true"
					/>
					<atom-img
						v-if="showPreview && imageUrl"
						class="rounded-12"
						:draggable="false"
						max-height="120"
						max-width="160"
						:src="imageUrl"
						alt="External image is invalid"
						cover
						@load="error = false"
						@error="onImageError"
					/>
					<atom-img
						v-else
						class="rounded-12"
						:draggable="false"
						max-height="120"
						max-width="160"
						src="/img/default/no-image.png"
						cover
					/>
				</div>
				<div class="align-self-stretch d-flex flex-column justify-end">
					<atom-btn
						class="ma-2 font-weight-semibold"
						min-width="80"
						rounded="pill"
						variant="tonal"
						size="small"
						@click="show = false"
					>
						Cancel
					</atom-btn>
					<atom-btn
						class="ma-2 font-weight-semibold"
						min-width="80"
						rounded="pill"
						color="success"
						size="small"
						:disabled="error ? true : false"
						@click="onAdd"
					>
						Add
					</atom-btn>
				</div>
			</div>
		</v-sheet>
	</v-menu>
</template>

<script setup lang="ts">
import { mdiLink } from '@mdi/js'
import { AtomBtn } from '#components'

interface Props {
	disabled?: boolean
	btnAttrs?: InstanceType<typeof AtomBtn>['$props']
}

defineProps<Props>()

const imageUrl = ref('')
const show = ref(false)
const debounceImageUrl = refDebounced(imageUrl, 500)
const error = ref(true)
const showPreview = ref(false)
const emits = defineEmits<(e: 'add', imageUrl: string) => void>()

watch(debounceImageUrl, () => {
	showPreview.value = true
})

const onImageError = function (e: Event) {
	error.value = true
	showPreview.value = false
}

const onAdd = () => {
	emits('add', imageUrl.value)
	show.value = false
	imageUrl.value = ''
}
</script>

<style lang="scss" scoped>
:deep(.input-image-url) {
	.v-field__input {
		font-size: 14px;
	}
}
</style>
