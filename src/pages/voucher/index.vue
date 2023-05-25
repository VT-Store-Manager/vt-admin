<template>
	<template-page-container page-name="Voucher">
		<template #subtitle>
			<p>{{ dataLength }} vouchers</p>
		</template>
		<template #title-right>
			<base-progress-circular
				v-show="voucher.loading"
				:class="{ done: !voucher.loading }"
			/>
			<button-refresh
				class="mr-3"
				title="Refresh data"
				@click="refreshData"
			/>
			<button-create @click="$router.push('/voucher/create')">
				New voucher
			</button-create>
		</template>
		<voucher-page-container />
	</template-page-container>
</template>

<script lang="ts" setup>
const voucher = useVoucher()
const dataLength = computed(() => voucher.response?.data.maxCount || 0)

const refreshData = () => voucher.fetch()

refreshData()
</script>
