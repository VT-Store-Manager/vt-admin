<template>
	<molecule-dialog
		v-model="show"
		:card-attrs="{}"
		:sheet-attrs="{
			width: '95%',
			maxWidth: '700px',
		}"
		title="Tạo tài khoản bán hàng"
		persistent
		:error-message="error?.data?.message"
		:status="status"
	>
		<template #headActions>
			<atom-btn
				size="small"
				class="mr-4 font-weight-bold"
				color="yellow-darken-4"
				variant="tonal"
				elevation="1"
				@click="handleReset"
			>
				Reset
			</atom-btn>
		</template>
		<v-row>
			<v-col cols="5">
				<molecule-input
					v-model="username.value.value"
					input-type="text-field"
					label="Tên tài khoản"
					hide-details
					placeholder="Username"
				/>
			</v-col>

			<v-col cols="7">
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
			</v-col>
		</v-row>
		<template #actions>
			<molecule-btn-keep-and-close />
			<molecule-btn-save-dialog
				:loading="status === 'pending'"
				@click="submit"
			/>
		</template>
	</molecule-dialog>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { CreateAccountSaleBody, createAccountSaleSchema } from '~/models'

const show = defineModel<boolean>('show', { default: false, local: true })
const createAccountSale = useCreateAccountSale()
const { error, status } = storeToRefs(createAccountSale)
const { storeSelectData, pending: pendingStoreData } = storeToRefs(
	useStoreList()
)
const { push } = useAlert()
const { handleSubmit, handleReset } = useForm<CreateAccountSaleBody>({
	validationSchema: createAccountSaleSchema,
})
const serverImgUrl = useRuntimeConfig().public.apiBase + config.api.filePrefix

const username = useField<string>('username')
const storeId = useField<string>('storeId')

const submit = handleSubmit(async values => {
	await createAccountSale.executeWithPayload(values)
	if (createAccountSale.isSuccess) {
		show.value = false
		await useAccountSaleList().refresh()
		push({
			type: 'success',
			text: 'Create account sale successfully',
			duration: 5000,
		})
	} else {
		push({
			type: 'error',
			text: 'Create account sale failed',
			duration: 5000,
		})
	}
})
</script>

<style scoped></style>
