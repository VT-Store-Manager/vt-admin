<template>
	<v-row v-if="voucherData">
		<v-col cols="12">
			<template-voucher-edit-info />
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
const { data: voucherData } = storeToRefs(useVoucherDetail())
</script>
