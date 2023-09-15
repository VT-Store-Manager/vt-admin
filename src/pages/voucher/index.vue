<template>
	<molecule-list-page-container page-name="Vouchers">
		<template #subtitle>
			<p>{{ totalCount }} voucher{{ totalCount > 1 ? 's' : '' }}</p>
		</template>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Refresh data"
				@click="refresh"
			/>
			<atom-btn
				class="mr-3"
				@click="showPublishDialog = true"
			>
				Publish
			</atom-btn>
			<molecule-btn-create @click="$router.push('/voucher/create')">
				New
			</molecule-btn-create>
		</template>
		<template-voucher-list />
		<template-publish-voucher-dialog v-model:show="showPublishDialog" />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
const voucherList = useVoucherList()
const { totalCount } = storeToRefs(voucherList)
const { refresh, pushQuery } = voucherList
const showPublishDialog = ref(false)

pushQuery()
</script>
