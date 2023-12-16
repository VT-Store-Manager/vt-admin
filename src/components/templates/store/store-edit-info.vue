<template>
	<atom-labeled-sheet
		label="Information"
		class="pt-10 pb-6 h-100 d-flex flex-column"
	>
		<molecule-btn-icon-restore
			class="ml-auto mb-4"
			@click="handleReset"
		/>
		<div class="flex-grow-1">
			<v-row>
				<v-col
					cols="7"
					md="6"
					lg="6"
					class="pb-0"
				>
					<molecule-input
						v-model="name.value.value"
						:error-messages="name.errorMessage.value"
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
						:error-messages="openTime.errorMessage.value"
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
								v-model="street.value.value"
								:error-messages="street.errorMessage.value"
								input-type="text-field"
								label="Street"
							/>
						</v-col>
						<v-col
							cols="4"
							class="pb-0"
						>
							<molecule-input
								v-model="ward.value.value"
								:error-messages="ward.errorMessage.value"
								input-type="text-field"
								label="Ward"
								optional
							/>
						</v-col>
						<v-col cols="4">
							<molecule-input
								v-model="district.value.value"
								:error-messages="district.errorMessage.value"
								input-type="text-field"
								label="District"
							/>
						</v-col>
						<v-col cols="4">
							<molecule-input
								v-model="city.value.value"
								:error-messages="city.errorMessage.value"
								input-type="text-field"
								label="City"
							/>
						</v-col>
						<v-col cols="4">
							<molecule-input
								v-model="country.value.value"
								:error-messages="country.errorMessage.value"
								input-type="text-field"
								label="Country"
							/>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</div>
		<div class="d-flex justify-end mt-2">
			<molecule-btn-save-dialog
				:disabled="!submittable && (isNotChanged || !isEmpty(errors))"
				v-bind="isNotChanged ? { color: 'grey' } : {}"
				:loading="status === 'pending'"
				@click="submit"
			>
				Save
			</molecule-btn-save-dialog>
		</div>
	</atom-labeled-sheet>
</template>

<script setup lang="ts">
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'

import { useField, useForm } from 'vee-validate'
import { UpdateStoreInfoModel, createStoreSchema } from '~/models'

const { handleSubmit, handleReset, errors, resetForm } =
	useForm<UpdateStoreInfoModel>({
		validationSchema: createStoreSchema,
	})

const storeDetail = useStoreDetail()
const { storeData } = storeToRefs(storeDetail)
const updateStoreInfo = useUpdateStoreInfo()
const { executeWithPayload } = updateStoreInfo
const { error, status } = storeToRefs(updateStoreInfo)
const { push } = useAlert()
const submittable = ref(true)

const initData = computed<UpdateStoreInfoModel>(() => {
	if (!storeData.value)
		return {
			name: '',
			openTime: { start: '00:00', end: '00:00' },
			street: '',
			ward: '',
			district: '',
			city: '',
			country: '',
		}
	return {
		name: storeData.value.name,
		openTime: storeData.value.openTime,
		street: storeData.value.address.street,
		ward: storeData.value.address.ward,
		district: storeData.value.address.district,
		city: storeData.value.address.city,
		country: storeData.value.address.country,
	}
})

const name = useField<string>('name', undefined, {
	initialValue: initData.value.name,
})
const openTime = useField<UpdateStoreInfoModel['openTime']>(
	'openTime',
	undefined,
	{
		initialValue: initData.value.openTime,
	}
)
const street = useField<UpdateStoreInfoModel['street']>('street', undefined, {
	initialValue: initData.value.street,
})
const ward = useField<UpdateStoreInfoModel['ward']>('ward', undefined, {
	initialValue: initData.value.ward,
})
const district = useField<UpdateStoreInfoModel['district']>(
	'district',
	undefined,
	{
		initialValue: initData.value.district,
	}
)
const city = useField<UpdateStoreInfoModel['city']>('city', undefined, {
	initialValue: initData.value.city,
})
const country = useField<UpdateStoreInfoModel['country']>(
	'country',
	undefined,
	{
		initialValue: initData.value.country,
	}
)

watch(storeData, () => {
	resetForm({ values: initData.value })
})

const isNotChanged = computed(() => {
	return (
		!storeData.value ||
		(isEqual(name.value.value, storeData.value.name) &&
			isEqual(openTime.value.value, storeData.value.openTime) &&
			isEqual(street.value.value, storeData.value.address.street) &&
			isEqual(ward.value.value, storeData.value.address.ward) &&
			isEqual(district.value.value, storeData.value.address.district) &&
			isEqual(city.value.value, storeData.value.address.city) &&
			isEqual(country.value.value, storeData.value.address.country))
	)
})

const submit = handleSubmit(async values => {
	submittable.value = false
	await executeWithPayload({
		storeId: useRoute().params.id as string,
		name: values.name,
		openTime: values.openTime,
		address: {
			street: values.street,
			ward: values.ward,
			district: values.district,
			city: values.city,
			country: values.country,
		},
	})
	if (error.value) {
		push({
			text: 'Cập nhật thất bại',
			description: error.value.message,
			type: 'error',
			duration: 15000,
		})
	} else {
		push({
			text: 'Cập nhật thông tin cửa hàng thành công',
			type: 'success',
			duration: 5000,
		})
		await storeDetail.refresh()
	}
})
</script>
