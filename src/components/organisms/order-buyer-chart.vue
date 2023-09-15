<template>
	<molecule-dashboard-card
		title="Tỷ lệ người mua"
		option-button
	>
		<div class="px-3">
			<div
				class="font-weight-bold text-24px d-flex align-baseline justify-space-between"
			>
				<p class="flex-1-0 text-center">{{ orderAmount[0] }}</p>
				<p class="text-14px font-weight-medium">đơn Thành viên</p>
			</div>
			<div
				class="font-weight-bold text-24px d-flex align-baseline justify-space-between"
			>
				<p class="flex-1-0 text-center">{{ orderAmount[1] }}</p>
				<p class="text-14px font-weight-medium">đơn Khách hàng</p>
			</div>
			<v-divider class="mt-3 mb-5" />
		</div>
		<v-row class="px-4">
			<v-col
				cols="12"
				:style="{ height: '250px' }"
			>
				<v-progress-circular v-if="pending" />
				<Doughnut
					v-else
					:data="chartData"
					:options="chartOptions"
				/>
			</v-col>
		</v-row>
	</molecule-dashboard-card>
</template>

<script setup lang="ts">
import {
	Chart as ChartJS,
	Tooltip,
	Legend,
	ChartData,
	ArcElement,
	ChartOptions,
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const { data, pending } = storeToRefs(useStatisticOrderAmount())
const orderAmount = computed(() =>
	Object.values(data.value?.year || {}).reduce(
		(res, order) => {
			res[0] += order.memberOrderCount
			res[1] += order.totalCount - order.memberOrderCount
			return res
		},
		[0, 0]
	)
)
const chartData = computed<ChartData<'doughnut', number[], string>>(() => {
	return {
		labels: ['Thành viên', 'Khách'],
		datasets: [
			{
				label: 'Tất cả',
				backgroundColor: ['#F6A847', '#42A0BC'],
				data: orderAmount.value,
				hoverOffset: 6,
			},
		],
	}
})

const chartOptions = computed<ChartOptions<'doughnut'>>(() => {
	return {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'bottom',
				labels: {
					font: {
						size: 14,
						weight: '500',
						family: 'Noto Sans',
					},
					padding: 16,
					useBorderRadius: true,
					borderRadius: 4,
					boxWidth: 15,
				},
			},
			tooltip: {
				titleFont: {
					family: 'Noto Sans',
					size: 14,
				},
				bodyFont: {
					family: 'Noto Sans',
					size: 12,
					weight: '500',
				},
				boxPadding: 4,
				padding: 10,
				callbacks: {
					label(tooltipItems) {
						return `Số đơn: ${tooltipItems.formattedValue}`
					},
					title([tooltipItem]) {
						const el = tooltipItem.element as ArcElement
						const percentage =
							((el.endAngle - el.startAngle) / (Math.PI * 2)) * 100
						return `${tooltipItem.label} (${percentage.toFixed(1)}%)`
					},
				},
			},
		},
	}
})
</script>

<style scoped></style>
