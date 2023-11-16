<template>
	<molecule-list-page-container page-name="Tài khoản giao hàng">
		<template #subtitle>
			<p>{{ totalShipper || '--' }} tài xế</p>
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
		<template-shipper-list />
		<template-new-shipper-dialog v-model:show="showCreateDialog" />
	</molecule-list-page-container>
</template>

<script setup lang="ts">
const shipperList = useShipperList()
const { totalShipper } = storeToRefs(shipperList)
const { refresh, pushQuery } = shipperList
const showCreateDialog = ref(false)
pushQuery()
</script>

<style scoped></style>
