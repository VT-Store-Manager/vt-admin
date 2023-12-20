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
				v-model="username"
				input-type="text-field"
				:readonly="loading"
				class="mb-2"
				:rules="[required]"
				label="Tài khoản"
				optional
				:prepend-inner-icon="mdiAccount"
			/>

			<molecule-input
				v-model="password"
				:append-inner-icon="showPassword ? mdiEye : mdiEyeOff"
				:readonly="loading"
				:rules="[required]"
				class="mb-5"
				:type="showPassword ? 'text' : 'password'"
				label="Mật khẩu"
				optional
				:prepend-inner-icon="mdiLock"
				@click:append-inner="showPassword = !showPassword"
			/>

			<div class="d-flex">
				<atom-btn
					:disabled="!form"
					:loading="loading"
					color="primary"
					size="large"
					type="submit"
					variant="elevated"
					class="font-weight-bold ma-auto"
					min-width="150"
				>
					Đăng nhập
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
import { mdiEye, mdiEyeOff, mdiLogin, mdiAccount, mdiLock } from '@mdi/js'
import { AuthModel } from '~/models'

definePageMeta({
	layout: 'outside',
})
useSeoMeta({
	title: "Login - Chillin' Admin",
})

const SAVED_ACCOUNT_KEY = 'saved_account'
const form = ref(false)
const savedAccount = useCookie<{ username: string; password: string }>(
	SAVED_ACCOUNT_KEY,
	{
		maxAge: 60 * 60 * 24 * 365,
	}
)
const username = ref(savedAccount.value?.username)
const password = ref(savedAccount.value?.password)
const showPassword = ref(false)
const loading = ref(false)
const error = ref()
const authStore = useAuthStore()
const { $router } = useNuxtApp()

if (authStore.auth?.accessToken) {
	$router.push('/')
}

const onSubmit = async () => {
	if (!form.value) return
	const loginData = {
		username: username.value,
		password: password.value,
	}

	const {
		data,
		error: _error,
		execute,
	} = useRequest<AuthModel>(
		'/auth/login',
		{
			method: 'POST',
			body: loginData,
			immediate: false,
			transform: input => input.data,
		},
		{
			auth: false,
		}
	)

	loading.value = true
	await execute()
	loading.value = false
	error.value = _error.value ? _error.value.message : undefined

	if (!error.value && data.value) {
		error.value = null
		authStore.setAuthData(data.value)
		savedAccount.value = loginData
		if (data.value.user.updatePassword) {
			$router.push({ path: '/update-password' })
			localStorage.setItem('oldPassword', password.value)
		} else {
			$router.push(authStore.callbackUrl || '/')
		}
	} else {
		error.value = _error.value?.message
	}
}

const required = (v: string) => !!v || 'Bắt buộc'
</script>
