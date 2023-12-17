<template>
	<molecule-list-page-container
		page-name="Cập nhật ưu đãi"
		:page-title="
			voucherDetail.data?.title
				? `Cập nhật ưu đãi - ${voucherDetail.data.title}`
				: 'Cập nhật ưu đãi'
		"
		scroll
	>
		<template #title-right>
			<molecule-btn-refresh
				title="Làm mới"
				@click="voucherDetail.refresh"
			/>
			<molecule-btn-edit
				class="ml-3"
				@click="$router.push(`/voucher/${voucherId}`)"
			>
				Chi tiết
			</molecule-btn-edit>
		</template>
		<template-voucher-edit class="mb-4" />
	</molecule-list-page-container>
</template>

<script setup lang="ts">
const voucherId = useRoute().params.id as string
const voucherDetail = useVoucherDetail()

voucherDetail.fetchVoucherDetail(voucherId)
</script>
