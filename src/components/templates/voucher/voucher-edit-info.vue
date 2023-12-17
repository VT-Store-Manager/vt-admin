<template>
	<atom-labeled-sheet
		label="Information"
		class="pt-10 pb-6 h-100 d-flex flex-column"
	>
		<molecule-btn-icon-restore
			class="ml-auto"
			@click="handleReset"
		/>
		<v-row dense>
			<v-col cols="3">
				<div class="relative w-100">
					<atom-img
						class="mr-4 my-2 rounded-12 small-img-shadow"
						:src="displayImage"
						:aspect-ratio="1"
						width="100%"
						cover
						placeholder="progress"
					/>
					<div
						class="absolute h-100 w-100"
						:style="{ bottom: 0, left: 0 }"
					>
						<organism-file-edit
							v-model="image"
							:init="[voucherData?.image]"
							:max-files="1"
							replace
							:btn-attrs="{ variant: 'elevated', elevation: 1 }"
							class="h-100 pt-2 px-2 flex-column-reverse align-end justify-space-between"
						/>
					</div>
				</div>
			</v-col>
			<v-col
				cols="9"
				class="pl-8"
			>
				<v-row dense>
					<v-col cols="12">
						<molecule-input
							v-model="title.value.value"
							:error-messages="title.errorMessage.value"
							input-type="text-field"
							label="Tên"
						/>
					</v-col>
					<v-col
						cols="5"
						class="pr-8"
					>
						<molecule-input
							v-model="code.value.value"
							:error-messages="code.errorMessage.value"
							input-type="text-field"
							label="Mã ưu đãi"
						/>
					</v-col>
					<v-col cols="7">
						<molecule-input
							v-model="partner.value.value"
							:error-messages="partner.errorMessage.value"
							input-type="select"
							:loading="pending"
							:items="partnerItems"
							item-title="name"
							item-value="id"
							optional
							select-one
							label="Đối tác"
							bg-color="white"
							:clearable="!!partner.value.value"
							density="comfortable"
						>
							<template #selection="{ item }">
								<div
									class="d-flex align-center"
									:style="{ height: '30px' }"
								>
									<atom-img
										:src="item.raw.image"
										server-img
										width="30"
										height="30"
										aspect-ratio="1/1"
										cover
										placeholder="progress"
										class="rounded shadow-cell-img mr-4"
									/>
									<p>{{ item.title }}</p>
								</div>
							</template>
							<template #item="{ props, item }">
								<v-list-item
									v-bind="props"
									:title="item.raw.name"
								>
									<template #prepend>
										<atom-img
											:src="item.raw.image"
											server-img
											max-width="35"
											aspect-ratio="1/1"
											cover
											placeholder="progress"
											class="rounded shadow-cell-img mr-4"
										/>
									</template>
								</v-list-item>
							</template>
						</molecule-input>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12">
				<molecule-input
					v-model="description.value.value"
					:error-messages="description.errorMessage.value"
					input-type="textarea"
					auto-grow
					label="Mô tả"
					rows="1"
				/>
			</v-col>
			<v-col
				cols="2"
				class="pr-4"
			>
				<molecule-input
					v-model="expireHour.value.value"
					:error-messages="expireHour.errorMessage.value"
					input-type="number-field"
					suffix="giờ"
					type="number"
					label="Thời hạn"
				/>
			</v-col>
			<v-col
				cols="5"
				class="px-4"
			>
				<molecule-input-datetime
					v-model="activeStartTime.value.value"
					:error-messages="activeStartTime.errorMessage.value"
					label="Thời gian bắt đầu"
					:date-picker-props="{ fromNow: false }"
					force-required
				/>
			</v-col>
			<v-col
				cols="5"
				class="pl-4"
			>
				<molecule-input-datetime
					v-model="activeFinishTime.value.value"
					:error-messages="activeFinishTime.errorMessage.value"
					label="Thời gian kết thúc"
					optional
					clearable
					:date-picker-props="{ minDate: activeStartTime.value.value }"
				/>
			</v-col>
		</v-row>

		<div class="d-flex justify-end mt-2">
			<molecule-btn-save-dialog
				:disabled="isNotChanged || !isEmpty(errors)"
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
import isEmpty from 'lodash/isEmpty'
import { useField, useForm } from 'vee-validate'
import { EditVoucherInfoModel, editVoucherInfoSchema } from '~/models'

const voucherDetail = useVoucherDetail()
const { data: voucherData, status } = storeToRefs(voucherDetail)
const { items, pending } = storeToRefs(usePartnerList())
const updateVoucherInfo = useUpdateVoucherInfo()
const { push } = useAlert()
const initData = computed<EditVoucherInfoModel>(() => {
	if (!voucherData.value) {
		return {
			image: '',
			title: '',
			code: '',
			description: '',
			expireHour: 0,
			activeStartTime: 0,
			activeFinishTime: 0,
			partner: '',
		}
	}
	return {
		image: voucherData.value.image,
		title: voucherData.value.title,
		code: voucherData.value.code,
		description: voucherData.value.description,
		expireHour: voucherData.value.expireHour,
		activeStartTime: voucherData.value.activeStartTime,
		activeFinishTime: voucherData.value.activeFinishTime,
		partner: voucherData.value.partner ?? '',
	}
})

const partnerItems = computed(() => {
	return [
		{
			id: '',
			name: "The Chillin' Coffee",
			image: '/img/logo/original.svg',
		},
		...items.value,
	]
})

const { handleSubmit, handleReset, errors, resetForm } =
	useForm<EditVoucherInfoModel>({
		validationSchema: editVoucherInfoSchema,
	})

const image = ref<(string | File)[]>([initData.value.image])

const title = useField<string>('title', undefined, {
	initialValue: initData.value.title,
})
const code = useField<string>('code', undefined, {
	initialValue: initData.value.code,
})
const description = useField<string>('description', undefined, {
	initialValue: initData.value.description,
})
const expireHour = useField<number>('expireHour', undefined, {
	initialValue: initData.value.expireHour,
})
const activeStartTime = useField<Date | number>('activeStartTime', undefined, {
	initialValue: initData.value.activeStartTime,
})
const activeFinishTime = useField<Date | number>(
	'activeFinishTime',
	undefined,
	{
		initialValue: initData.value.activeFinishTime,
	}
)
const partner = useField<string>('partner', undefined, {
	initialValue: initData.value.partner,
})

const displayImage = computed(() => {
	if (!image.value?.[0]) return ''
	if (typeof image.value[0] === 'string') return image.value[0]
	return URL.createObjectURL(image.value[0])
})

watchDebounced(
	code.value,
	() => {
		if (code.errorMessage.value) return
		code.value.value = code.value.value.toUpperCase()
	},
	{ debounce: 1000 }
)

watch(partner.value, value => {
	if (!value) partner.value.value = ''
})

watch(voucherData, () => {
	image.value = voucherData.value?.image ? [voucherData.value.image] : []
	resetForm({ values: { ...initData.value } })
})

const isNotChanged = computed(() => {
	return (
		!voucherData.value ||
		(image.value[0] === initData.value.image &&
			title.value.value === initData.value.title &&
			code.value.value === initData.value.code &&
			description.value.value === initData.value.description &&
			expireHour.value.value === initData.value.expireHour &&
			activeStartTime.value.value === initData.value.activeStartTime &&
			activeFinishTime.value.value === initData.value.activeFinishTime &&
			partner.value.value === initData.value.partner)
	)
})

const submit = handleSubmit(async values => {
	const currentData = { ...values, image: image.value[0] }

	const changedData = Object.keys(initData.value).reduce((res, key) => {
		const fieldName = key as keyof typeof currentData
		if (currentData[fieldName] !== initData.value[fieldName]) {
			res[fieldName] = currentData[fieldName] as any
		}
		return res
	}, {} as Partial<EditVoucherInfoModel>)

	await updateVoucherInfo.executePayload(
		useRoute().params.id as string,
		changedData
	)

	if (updateVoucherInfo.error) {
		push({
			text: 'Cập nhật ưu đãi thất bại',
			description: updateVoucherInfo.error.message,
			type: 'error',
			duration: 15000,
		})
	} else {
		push({
			text: 'Cập nhật ưu đãi thành công',
			type: 'success',
			duration: 5000,
		})
		await voucherDetail.refresh()
	}
})
</script>
