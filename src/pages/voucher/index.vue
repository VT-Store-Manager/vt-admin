<template>
	<molecule-list-page-container page-name="Vouchers">
		<template #subtitle>
			<p>{{ totalCount }} vouchers</p>
		</template>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Refresh data"
				@click="refresh"
			/>
			<molecule-btn-create @click="$router.push('/voucher/create')">
				New
			</molecule-btn-create>
		</template>
		<template-voucher-list />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const voucherList = useVoucherList()
const { totalCount } = storeToRefs(voucherList)
const { refresh } = voucherList
</script>
