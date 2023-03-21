<template>
	<template-page-container page-name="Create store">
		<template #title-right>
			<base-progress-circular />
			<!-- v-show="createProduct.loading"
			:class="{ done: !createProduct.loading }" -->
			<v-hover>
				<template #default="{ isHovering, props }">
					<button-secondary
						v-bind="props"
						class="mr-4"
						:class="{ 'bg-red-darken-4': isHovering }"
						text="Reset"
						:icon="mdiRefresh"
					/>
				</template>
			</v-hover>
			<button-primary
				text="Save"
				:icon="mdiContentSave"
				@click="onSave"
			/>
		</template>
		<v-row class="h-100">
			<v-col
				cols="12"
				sm="4"
				class="pb-0"
			>
				<base-panel-new-image
					ref="storeImage"
					class="rounded-12 h-100"
					:max-images="6"
					:error-flag="isError.image"
				/>
			</v-col>
			<v-col
				cols="12"
				sm="8"
				class="pb-0"
			>
				<store-create-content
					ref="storeContent"
					class="rounded-12 h-100"
				/>
			</v-col>
		</v-row>
	</template-page-container>
</template>

<script lang="ts" setup>
import { mdiRefresh, mdiContentSave } from '@mdi/js'
import { CreateStoreModel } from '~/models/store'

const storeImage = ref<
	HTMLElement & {
		images: File[]
		validate: () => boolean
	}
>()
const storeContent = ref<
	HTMLElement & {
		data: CreateStoreModel
		validate: () => Promise<boolean>
	}
>()
const isError = reactive({
	image: false
})

const onSave = async () => {
	const isValidData = await storeContent.value!.validate()
	const isValidImage = storeImage.value?.validate()
	if (!isValidData || !isValidImage) return
	console.log(storeContent.value?.data)
}
</script>
