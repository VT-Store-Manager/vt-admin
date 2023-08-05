<template>
	<div class="statistic-overall-amount">
		<v-row>
			<v-col cols="3">
				<molecule-statistic-amount-card
					:icon="mdiAccountMultipleOutline"
					title="Thành viên tháng"
					:main-amount="totalAmount.data.member.thisTime"
					:change-amount="totalAmount.data.member.changeAmount"
					:change-percent="totalAmount.data.member.changePercent.toFixed(0)"
					:total-amount="totalAmount.data.member.totalCount"
					color="orange"
				/>
			</v-col>
			<v-col cols="3">
				<molecule-statistic-amount-card
					:icon="mdiCartVariant"
					title="Đơn hàng tháng"
					:main-amount="totalAmount.data.order.thisTime"
					:change-amount="totalAmount.data.order.changeAmount"
					:change-percent="totalAmount.data.order.changePercent.toFixed(0)"
					:total-amount="totalAmount.data.order.totalCount"
					color="teal"
				/>
			</v-col>
			<v-col cols="3">
				<molecule-statistic-amount-card
					:icon="mdiCash"
					title="Doanh thu tháng"
					:main-amount="
						totalAmount.data.revenue.thisTime
							.toLocaleString()
							.replace(/,/g, '.') + ' đ'
					"
					:change-amount="
						totalAmount.data.revenue.changeAmount
							.toLocaleString()
							.replace(/,/g, '.') + ' đ'
					"
					:change-percent="totalAmount.data.revenue.changePercent.toFixed(0)"
					:total-amount="
						totalAmount.data.revenue.totalCount
							.toLocaleString()
							.replace(/,/g, '.') + ' đ'
					"
					color="purple"
				/>
			</v-col>
			<v-col cols="3">
				<molecule-statistic-amount-card
					:icon="mdiCup"
					title="Doanh số tháng"
					:main-amount="totalAmount.data.sale.thisTime"
					:change-amount="totalAmount.data.sale.changeAmount"
					:change-percent="totalAmount.data.sale.changePercent.toFixed(0)"
					:total-amount="totalAmount.data.sale.totalCount"
					color="blue"
				/>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
import {
	mdiAccountMultipleOutline,
	mdiCartVariant,
	mdiCash,
	mdiCup,
} from '@mdi/js'

const totalAmount = useStatisticTotalAmount()
</script>

<style scoped></style>
