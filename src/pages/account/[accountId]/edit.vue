<template>
	<molecule-list-page-container page-name="Cập nhật tài khoản">
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Làm mới"
				@click="refresh"
			/>
			<molecule-btn-delete
				disabled
				variant="tonal"
				class="mr-3"
			>
				Huỷ
			</molecule-btn-delete>
			<atom-btn
				color="danger"
				class="font-weight-bold"
				:loading="resetPasswordStore.status === 'pending'"
				@click="resetPassword"
			>
				Đặt lại mật khẩu
			</atom-btn>
			<molecule-btn-save-dialog
				class="mr-3"
				:loading="updateAccount.status === 'pending'"
				@click="useEmit('save-account-edit')"
			/>
		</template>
		<template-account-edit />
	</molecule-list-page-container>
</template>

<script setup lang="ts">
const accountId = useRoute().params.accountId as string

const updateAccount = useUpdateAccountStore()
const resetPasswordStore = useResetPasswordStore()
const { refresh } = useAccountAdminList()
const alert = useAlert()

const resetPassword = async () => {
	await resetPasswordStore.executeWithPayload(accountId)
	if (resetPasswordStore.error) {
		alert.push({
			type: 'error',
			text: 'Reset password failed!',
			description: resetPasswordStore.error.message,
		})
	} else {
		alert.push({
			type: 'success',
			text: 'Reset password successful!',
			duration: 5000,
		})
	}
}
</script>

<style scoped></style>
