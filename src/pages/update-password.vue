<template>
	<v-card
		class="pa-8 rounded-12 elevation-3"
		width="450"
	>
		<v-form
			v-model="form"
			@submit.prevent="onSubmit"
		>
			<h1 class="text-center mb-6 text-primary-darken font-weight-black">
				CHILLIN' ADMIN
			</h1>

			<molecule-input
				v-model="newPassword"
				:append-inner-icon="showNewPassword ? mdiEye : mdiEyeOff"
				:rules="[required, passwordMatch]"
				class="mb-5"
				:type="showNewPassword ? 'text' : 'password'"
				label="Mật khẩu mới"
				optional
				:prepend-inner-icon="mdiLock"
				@click:append-inner="showNewPassword = !showNewPassword"
			/>
			<molecule-input
				v-model="confirmPassword"
				:append-inner-icon="showConfirmPassword ? mdiEye : mdiEyeOff"
				:rules="[required, confirmPasswordMatch]"
				class="mb-5"
				:type="showConfirmPassword ? 'text' : 'password'"
				label="Xác nhận mật khẩu mới"
				optional
				:prepend-inner-icon="mdiLock"
				@click:append-inner="showConfirmPassword = !showConfirmPassword"
			/>

			<div class="d-flex">
				<atom-btn
					:disabled="!form"
					:loading="status === 'pending'"
					color="primary"
					size="large"
					type="submit"
					variant="elevated"
					class="font-weight-bold ma-auto"
					min-width="150"
				>
					Cập nhật
					<v-icon
						:icon="mdiLogin"
						class="ml-1"
						:style="{ marginTop: '1px' }"
					/>
				</atom-btn>
			</div>
		</v-form>
		<v-alert
			v-if="error"
			closable
			:text="error.message"
			type="error"
			class="mt-4"
		/>
	</v-card>
</template>

<script setup lang="ts">
import { mdiEye, mdiEyeOff, mdiLogin, mdiLock } from '@mdi/js'
import { adminPasswordPattern } from '~/constants'

definePageMeta({
	layout: 'outside',
})
useSeoMeta({
	title: "Update password - Chillin' Admin",
})

const form = ref(false)
const newPassword = ref('')
const showNewPassword = ref(false)
const confirmPassword = ref('')
const showConfirmPassword = ref(false)
const { push } = useAlert()
const router = useRouter()
const { callbackUrl } = storeToRefs(useAuthStore())

const body = ref({ oldPassword: '', newPassword: '' })
const {
	status,
	error,
	execute,
	data: success,
} = useRequest<boolean>('/auth/update-password', {
	immediate: false,
	body,
	method: 'PATCH',
	transform: input => input.success,
})

const required = (v: string) => !!v || 'Bắt buộc'
const passwordMatch = (v: string) =>
	adminPasswordPattern.test(v) ||
	'Ít nhất 8 kí tự, gồm ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 kí tự đặc biệt'
const confirmPasswordMatch = (v: string) =>
	v === newPassword.value || 'Xác nhận mật khẩu không khớp'

const onSubmit = async () => {
	const oldPassword = localStorage.getItem('oldPassword')
	if (!oldPassword) {
		router.push('/')
		return
	}
	body.value = {
		oldPassword,
		newPassword: newPassword.value,
	}
	await execute()
	if (success.value && !error.value) {
		push({
			text: 'Cập nhật mật khẩu thành công',
			type: 'success',
			duration: 3000,
		})
		localStorage.removeItem('oldPassword')

		useRouter().push(
			['/login', '/update-password'].includes(callbackUrl.value) ||
				!callbackUrl.value
				? '/'
				: callbackUrl.value
		)
	} else {
		push({
			text: 'Cập nhật mật khẩu không thành công',
			description: error.value?.message,
			type: 'error',
			duration: 15000,
		})
	}
}
</script>
