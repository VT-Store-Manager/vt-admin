<template>
	<molecule-dashboard-card
		title="Tỷ lệ đơn hàng"
		option-button
	>
		<v-row class="px-4">
			<v-col
				cols="12"
				:style="{ height: '300px' }"
			>
				<v-progress-circular v-if="pending" />
				<template v-else>
					<Doughnut
						:data="chartData"
						:options="chartOptions"
					/>
				</template>
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
const chartData = computed<ChartData<'doughnut', number[], string>>(() => {
	return {
		labels: ['Tại cửa hàng', 'Mang đi', 'Giao hàng'],
		datasets: [
			{
				label: 'Tất cả',
				// backgroundColor: ['#06C282', '#FD5D6F', '#1966C0'],
				data: Object.values(data.value?.day || {}).reduce(
					(res, order) => {
						res[0] += order.inStoreCount
						res[1] += order.pickupCount
						res[2] += order.deliveryCount
						return res
					},
					[0, 0, 0]
				),
				hoverOffset: 10,
			},
			// {
			// 	label: 'Tháng này',
			// 	backgroundColor: ['#06C282', '#FD5D6F', '#1966C0'],
			// 	data: [20, 10, 50],
			// 	hidden: true,
			// },
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
