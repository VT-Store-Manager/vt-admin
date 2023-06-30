<template>
	<molecule-dialog
		v-model="show"
		:card-attrs="{}"
		:sheet-attrs="{
			width: '95%',
			maxWidth: '1200px',
		}"
		title="New store"
		persistent
		:error-message="createStore.error?.data?.message"
		:status="createStore.status"
	>
		<template #headActions>
			<molecule-btn-reset @click="handleReset" />
		</template>
		<v-row class="card-container">
			<v-col cols="4">
				<atom-card class="pb-4 px-0">
					<template #title>
						<div class="d-flex align-center justify-space-between">
							<h4>Images</h4>
						</div>
					</template>
					<template #subtitle>
						{{ images.value.value?.length || 0 }}/{{ maxFiles }} files
					</template>
					<template #item>
						<v-expand-transition>
							<v-sheet
								v-show="images.errorMessage.value"
								height="18px"
								class="error-message text-12px text-error font-weight-regular"
							>
								{{ images.errorMessage.value }}
							</v-sheet>
						</v-expand-transition>

						<organism-file-panel
							v-model="images.value.value"
							:max-files="maxFiles"
							:error="images.errorMessage.value"
						/>
					</template>
				</atom-card>
			</v-col>
			<v-col cols="8">
				<atom-card>
					<template #title>
						<div class="d-flex align-center justify-space-between">
							<h4>Information</h4>
							<atom-btn
								class="font-weight-semibold"
								variant="tonal"
								color="danger"
								size="small"
							>
								Clear
							</atom-btn>
						</div>
					</template>
					<v-container class="content-form-container">
						<v-row>
							<v-col cols="7">
								<molecule-input
									v-model="name.value.value"
									:error-messages="name.errorMessage.value"
									input-type="text-field"
									label="Store name"
								/>
							</v-col>
							<v-col cols="5">
								<molecule-input-time-period
									v-model="openTime.value.value"
									:error-message="openTime.errorMessage.value"
								/>
							</v-col>
						</v-row>
						<v-divider class="border-opacity-25 mt-3 mb-6" />
						<h3 class="mb-2">Address</h3>
						<v-row>
							<v-col
								cols="8"
								class="pb-0"
							>
								<molecule-input
									:model-value="address.value.value?.street"
									:error-messages="name.errorMessage.value"
									input-type="text-field"
									label="Street"
									@update:model-value="(v: string) => onInput(v, 'street')"
								/>
							</v-col>
							<v-col
								cols="4"
								class="pb-0"
							>
								<molecule-input
									:model-value="address.value.value?.ward"
									:error-messages="name.errorMessage.value"
									input-type="text-field"
									label="Ward"
									optional
									@update:model-value="(v: string) => onInput(v, 'ward')"
								/>
							</v-col>
							<v-col cols="4">
								<molecule-input
									:model-value="address.value.value?.district"
									:error-messages="name.errorMessage.value"
									input-type="text-field"
									label="District"
									@update:model-value="(v: string) => onInput(v, 'district')"
								/>
							</v-col>
							<v-col cols="4">
								<molecule-input
									:model-value="address.value.value?.city"
									:error-messages="name.errorMessage.value"
									input-type="text-field"
									label="City"
									@update:model-value="(v: string) => onInput(v, 'city')"
								/>
							</v-col>
							<v-col cols="4">
								<molecule-input
									:model-value="address.value.value?.country"
									:error-messages="name.errorMessage.value"
									input-type="text-field"
									label="Country"
									@update:model-value="(v: string) => onInput(v, 'country')"
								/>
							</v-col>
						</v-row>
					</v-container>
				</atom-card>
			</v-col>
		</v-row>
		<template #actions>
			<molecule-btn-keep-and-close />
			<molecule-btn-save-dialog
				:loading="createStore.status === 'pending'"
				@click="submit"
			/>
		</template>
	</molecule-dialog>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import {
	CreateStoreModel,
	createStoreSchema,
} from '~/models/create-store-model'
const show = defineModel<boolean>('show', { default: false, local: true })
const maxFiles = 6

const { handleSubmit, handleReset } = useForm<CreateStoreModel>({
	validationSchema: createStoreSchema,
})

const images = useField<File[]>('images')
const name = useField<string>('name')
const openTime = useField<CreateStoreModel['openTime']>('openTime')
const address = useField<CreateStoreModel['address']>('address')
const unavailableGoods =
	useField<CreateStoreModel['unavailableGoods']>('unavailableGoods')

const createStore = useCreateStore()
const { push } = useAlert()

const onInput = (v: string, fieldName: keyof CreateStoreModel['address']) => {
	address.value.value = {
		...address.value.value,
		[fieldName]: v,
	}
}

const submit = handleSubmit(async values => {
	await createStore.executePayload(values)
	if (createStore.success) {
		show.value = false
		await useProductList().refresh()
		push({
			type: 'success',
			text: 'Create store successfully',
			duration: 5000,
		})
	}
})
</script>

<style scoped></style>
