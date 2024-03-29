<template>
	<molecule-dialog
		v-model="show"
		:card-attrs="{}"
		:sheet-attrs="{
			width: '95%',
			maxWidth: '900px',
		}"
		title="Thêm nhân viên"
		persistent
		:error-message="createEmployee.error?.data?.message"
		:status="createEmployee.status"
	>
		<template #headActions>
			<molecule-btn-reset @click="handleReset" />
		</template>
		<template #default>
			<molecule-input
				v-model="storeId.value.value"
				:error-messages="storeId.errorMessage.value"
				input-type="autocomplete"
				label="Cửa hàng"
				:items="storeSelectData"
				:loading="pendingStoreData"
				:auto-select-first="true"
				chips
				closable-chips
				placeholder="Store"
			>
				<template #chip="{ props, item }">
					<v-chip
						v-bind="props"
						:prepend-avatar="serverImgUrl + item.raw.image"
						:text="item.raw.name"
					/>
				</template>
				<template #item="{ props, item }">
					<v-list-item
						v-bind="props"
						:prepend-avatar="serverImgUrl + item?.raw?.image"
						:title="item?.raw?.title"
					/>
				</template>
			</molecule-input>
			<v-row>
				<v-col cols="6">
					<atom-label label="Ảnh đại diện" />
					<organism-file-panel
						v-model="avatar.value.value"
						:max-files="1"
						:error="!!avatar.errorMessage.value"
						css-class="mt-0 mb-4"
					/>
					<molecule-input
						v-model="name.value.value"
						:error-messages="name.errorMessage.value"
						input-type="text-field"
						label="Họ và tên"
					/>
					<molecule-input
						v-model="phone.value.value"
						:error-messages="phone.errorMessage.value"
						input-type="text-field"
						label="Số điện thoại"
						prefix="(+84)"
					/>
					<molecule-input
						v-model="gender.value.value"
						:options="
							Gender.map((item, index) => ({
								label: $capitalize(item),
								value: index,
							}))
						"
						:inline="true"
						:error-messages="gender.errorMessage.value"
						input-type="radio"
						label="Giới tính"
						color="primary"
					/>
				</v-col>
				<v-col cols="6">
					<atom-label label="Ngày sinh" />
					<atom-date-picker
						v-model="dob.value.value"
						inline
						auto-apply
						full-width
						:enable-time-picker="false"
						position="center"
						class="justify-center"
						:from-now="false"
					/>
					<div class="d-flex justify-space-between py-4">
						<p class="font-weight-bold">Đã chọn:</p>
						<p class="font-weight-medium">
							<span>{{
								$capitalize($dayjs(dob.value.value).format('dddd'))
							}}</span>
							&comma;
							<span>{{ $dayjs(dob.value.value).format('YYYY-MM-DD') }}</span>
						</p>
					</div>
				</v-col>
			</v-row>
			<v-expand-transition>
				<v-sheet
					v-show="createEmployee.error"
					height="18px"
					class="error-message text-12px text-error font-weight-regular mt-1 ml-4"
				>
					{{ createEmployee.error }}
				</v-sheet>
			</v-expand-transition>
		</template>
		<template #actions>
			<molecule-btn-keep-and-close @click="show = false" />
			<molecule-btn-save-dialog
				:loading="createEmployee.status === 'pending'"
				@click="submit"
			/>
		</template>
	</molecule-dialog>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { CreateEmployeeModel, createEmployeeSchema } from '~/models'

const show = defineModel<boolean>('show', { default: false, local: true })
const createEmployee = useCreateEmployee()
const { storeSelectData, pending: pendingStoreData } = storeToRefs(
	useStoreList()
)

const { handleSubmit, handleReset } = useForm<CreateEmployeeModel>({
	validationSchema: createEmployeeSchema,
})
const serverImgUrl = useRuntimeConfig().public.apiBase + config.api.filePrefix

const storeId = useField<string>('store')
const phone = useField<string>('phone')
const name = useField<string>('name')
const avatar = useField<File[]>('avatar')
const gender = useField<keyof typeof Gender>('gender')
const dob = useField<Date>('dob')
const { push } = useAlert()

const submit = handleSubmit(async values => {
	values.avatar = (values.avatar as File[])[0]
	await createEmployee.executeWithPayload(values)
	if (createEmployee.isSuccess) {
		show.value = false
		handleReset()
		await useEmployeeList().refresh()
		push({
			type: 'success',
			text: 'Create employee successfully',
			duration: 5000,
		})
	}
})
</script>

<style scoped></style>
