<template>
	<molecule-list-page-container page-name="Tài khoản bán hàng">
		<template #subtitle>
			<p>{{ totalAccount || '--' }} tài khoản</p>
		</template>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Làm mới"
				@click="refresh"
			/>
			<molecule-btn-create @click="showCreateDialog = true">
				Tạo mới
			</molecule-btn-create>
		</template>
		<template-account-sale-list />
		<template-new-account-sale-dialog v-model:show="showCreateDialog" />
	</molecule-list-page-container>
</template>

<script setup lang="ts">
const accountSaleList = useAccountSaleList()
const { totalAccount } = storeToRefs(accountSaleList)
const { refresh, pushQuery } = accountSaleList
const showCreateDialog = ref(false)
pushQuery()
</script>

<style scoped></style>
