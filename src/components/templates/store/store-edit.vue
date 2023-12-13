<template>
	<v-row v-if="storeData">
		<v-col cols="4">
			<organism-edit-images
				:init-images="storeData.images"
				:max-files="maxFiles"
				:pending="status === 'pending'"
				class="h-100"
				@save="onUpdateStoreImage"
			/>
		</v-col>
		<v-col cols="8">
			<atom-labeled-sheet
				label="Information"
				class="pt-10 pb-6 h-100"
			>
				<v-row>
					<v-col
						cols="7"
						md="6"
						lg="6"
						class="pb-0"
					>
						<molecule-input
							v-model="name.value.value"
							input-type="text-field"
							label="Store name"
						/>
					</v-col>
					<v-col
						cols="5"
						md="6"
						lg="6"
						class="pb-0"
					>
						<molecule-input-time-period
							v-model="openTime.value.value"
							:input-props="{
								hideDetails: true,
							}"
						/>
					</v-col>
					<v-col cols="12">
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
					</v-col>
				</v-row>
			</atom-labeled-sheet>
			<!-- <v-row>
				<v-col cols="12">
				</v-col> -->
			<!-- </v-row> -->
		</v-col>
		<v-col cols="12">
			<atom-labeled-sheet
				label="Unavailable goods"
				class="pt-10 pb-6"
			>
				<v-row>
					<v-col cols="4">
						<p class="font-weight-bold mb-2">Products</p>
						<p
							v-if="storeData.unavailableGoods.product.length === 0"
							class="font-italic text-grey text-14px"
						>
							No unavailable
						</p>
						<div
							v-else
							class="unavailable-list"
						>
							<v-hover
								v-for="item in storeData.unavailableGoods.product"
								:key="item.id"
							>
								<template
									#default="{ isHovering: hoveringName, props: nameProps }"
								>
									<atom-link
										:to="'/product/' + item.id"
										class="d-flex align-center"
									>
										<atom-img
											class="mr-4 my-2 rounded small-img-shadow"
											:src="item.image"
											height="40"
											:max-width="40"
											:aspect-ratio="1"
											cover
											:class="{ 'hover-blur': hoveringName }"
											server-img
											:style="{ width: '40px' }"
											placeholder="progress"
										/>
										<div class="d-flex flex-column justify-center py-1">
											<span
												v-bind="nameProps"
												class="ellipsis-2 text-14px font-weight-medium"
												:class="{ 'text-primary': hoveringName }"
											>
												{{ item.name }}
											</span>
											<atom-link
												:to="`/product/category/${item.category}`"
												class="text-12px"
												highlight-hover
											>
												{{ item.categoryName }}
											</atom-link>
										</div>
									</atom-link>
								</template>
							</v-hover>
						</div>
					</v-col>
					<v-col cols="4">
						<p class="font-weight-bold mb-2">Categories</p>
						<p
							v-if="storeData.unavailableGoods.category.length === 0"
							class="font-italic text-grey text-14px"
						>
							No unavailable
						</p>
						<div
							v-else
							class="unavailable-list"
						>
							<v-hover
								v-for="item in storeData.unavailableGoods.category"
								:key="item.id"
							>
								<template
									#default="{ isHovering: hoveringName, props: nameProps }"
								>
									<atom-link
										:to="'/product/category/' + item.id"
										class="d-flex align-center"
									>
										<atom-img
											class="mr-4 my-2 rounded-pill small-img-shadow"
											:src="item.image"
											height="40"
											:max-width="40"
											:aspect-ratio="1"
											cover
											:class="{ 'hover-blur': hoveringName }"
											server-img
											:style="{ width: '40px' }"
											placeholder="progress"
										/>
										<div class="d-flex flex-column justify-center py-1">
											<span
												v-bind="nameProps"
												class="ellipsis-2 text-14px font-weight-medium"
												:class="{ 'text-primary': hoveringName }"
											>
												{{ item.name }}
											</span>
											<span class="text-12px">
												{{ item.amountOfProduct }} sản phẩm
											</span>
										</div>
									</atom-link>
								</template>
							</v-hover>
						</div>
					</v-col>
					<v-col cols="4">
						<p class="font-weight-bold mb-2">Options</p>
						<p
							v-if="storeData.unavailableGoods.option.length === 0"
							class="font-italic text-grey text-14px"
						>
							No unavailable
						</p>
						<div
							v-else
							class="unavailable-list"
						>
							<v-hover
								v-for="item in storeData.unavailableGoods.option"
								:key="item.id"
							>
								<template
									#default="{ isHovering: hoveringName, props: nameProps }"
								>
									<atom-link
										:to="'/product/option/' + item.id"
										class="d-flex align-center"
									>
										<div class="d-flex flex-column justify-center py-1">
											<span
												v-bind="nameProps"
												class="ellipsis-2 text-14px font-weight-medium"
												:class="{ 'text-primary': hoveringName }"
											>
												{{ item.name }}
												<span class="text-12px font-italic text-grey-darken-2">
													({{ item.items.length }} item)
												</span>
											</span>
											<span class="text-12px">
												Áp dụng {{ item.applying }} sản phẩm
											</span>
										</div>
									</atom-link>
								</template>
							</v-hover>
						</div>
					</v-col>
				</v-row>
			</atom-labeled-sheet>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { CreateStoreModel, createStoreSchema } from '~/models'

const storeDetail = useStoreDetail()
const { storeData } = storeToRefs(storeDetail)
const { refresh } = storeDetail
const { executePayload, status } = useUpdateStoreImage()
const { push } = useAlert()
const maxFiles = 6
const storeId = useRoute().params.id as string

const { handleSubmit: _handleSubmit, handleReset: _handleReset } =
	useForm<CreateStoreModel>({
		validationSchema: createStoreSchema,
	})

const images = ref<(File | string)[]>([...(storeData.value?.images || [])])
const name = useField<string>('name', undefined, {
	initialValue: storeData.value?.name,
})
const openTime = useField<CreateStoreModel['openTime']>('openTime', undefined, {
	initialValue: storeData.value?.openTime,
})
const address = useField<CreateStoreModel['address']>('address', undefined, {
	initialValue: storeData.value?.address,
})

const onInput = (v: string, fieldName: keyof CreateStoreModel['address']) => {
	address.value.value = {
		...address.value.value,
		[fieldName]: v,
	}
}

watch(storeData, storeDataValue => {
	if (storeDataValue) {
		images.value = storeDataValue.images
		name.value.value = storeDataValue.name
		openTime.value.value = storeDataValue.openTime
		address.value.value = storeDataValue.address
	}
})

const onUpdateStoreImage = async (images: Array<string | File>) => {
	const files: File[] = images.filter(image => image instanceof File) as any
	const imageMap = images.reduce((res, image, index) => {
		if (typeof image === 'string') {
			res.push(`[${index}]:${image}`)
		}
		return res
	}, [] as string[])

	await executePayload(storeId, {
		files,
		imageMap,
	})

	if (!storeDetail.error) {
		push({
			type: 'success',
			text: "Update store's images successfully",
			duration: 5000,
		})
	} else {
		push({
			type: 'error',
			text: "Update store's images failed",
			duration: 15000,
		})
	}
	await refresh()
}
</script>
