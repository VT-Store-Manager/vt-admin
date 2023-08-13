<template>
	<molecule-dashboard-card
		title="Thống kê đơn hàng"
		option-button
	>
		<v-row>
			<v-col
				cols="12"
				:style="{ minHeight: '300px' }"
			>
				<v-progress-circular v-if="pending" />
				<template v-else>
					<Line
						v-iv="renderChart"
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
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartData,
	ChartOptions,
	Filler,
} from 'chart.js'
import { Line } from 'vue-chartjs'

import maxBy from 'lodash/maxBy'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
)

const renderChart = ref(true)
const { data, pending } = storeToRefs(useStatisticOrderAmount())
const { $createGradientCanvas } = useNuxtApp()
const { collapse } = storeToRefs(useSidebar())

const colors = {
	orange: '#F47C01',
	green: '#06C282',
	red: '#FD5D6F',
	blue: '#1966C0',
}

const currentChart = ref(0)

const chartData = computed<ChartData<'line', number[], string>>(() => {
	return {
		labels: data.value ? Object.keys(data.value.day) : [],
		datasets: [
			{
				label: 'Tất cả loại',
				data: Object.values(data.value?.day || {}).map(
					order => order.totalCount
				),
				hidden: currentChart.value !== 0,
				borderColor: colors.orange,
				borderWidth: 1.5,
				fill: true,
				backgroundColor: $createGradientCanvas(colors.orange),
				// pointBackgroundColor: 'white',
			},
			{
				label: 'Tại cửa hàng',
				data: Object.values(data.value?.day || {}).map(
					order => order.inStoreCount
				),
				hidden: currentChart.value !== 1,
				borderColor: colors.green,
				borderWidth: 1.5,
				fill: true,
				backgroundColor: $createGradientCanvas(colors.green),
				// pointBackgroundColor: 'white',
			},
			{
				label: 'Mang đi',
				data: Object.values(data.value?.day || {}).map(
					order => order.pickupCount
				),
				hidden: currentChart.value !== 2,
				borderColor: colors.red,
				borderWidth: 1.5,
				fill: true,
				backgroundColor: $createGradientCanvas(colors.red),
				// pointBackgroundColor: 'white',
			},
			{
				label: 'Giao hàng',
				data: Object.values(data.value?.day || {}).map(
					order => order.deliveryCount
				),
				hidden: currentChart.value !== 3,
				borderColor: colors.blue,
				borderWidth: 1.5,
				fill: true,
				backgroundColor: $createGradientCanvas(colors.blue),
				// pointBackgroundColor: 'white',
			},
		],
	}
})

const chartOptions = computed<ChartOptions<'line'>>(() => {
	return {
		maintainAspectRatio: false,
		responsive: true,
		interaction: {
			intersect: false,
		},
		tension: 0.4,
		elements: {
			point: {
				radius: 0,
				hoverBackgroundColor: 'white',
				hoverRadius: 6,
				hoverBorderWidth: 2,
			},
		},
		scales: {
			x: {
				display: true,
				title: {
					display: false,
				},
				ticks: {
					display: false,
				},
				grid: {
					display: true,
					color: 'rgba(0, 0, 0, 0.05)',
				},
			},
			y: {
				beginAtZero: true,
				max:
					(maxBy(Object.values(data.value?.day || {}), 'totalCount')
						?.totalCount || 8) + 1,
				display: true,
				title: {
					display: true,
					text: 'Số đơn',
					font: {
						family: 'Noto Sans',
						size: 14,
						weight: '600',
					},
				},
				ticks: {
					display: true,
					font: {
						family: 'Noto Sans',
						weight: '600',
					},
					padding: 8,
				},
				grid: {
					display: true,
					color: 'rgba(0, 0, 0, 0.05)',
				},
			},
		},
		plugins: {
			legend: {
				onClick(e, legendItem, legend) {
					currentChart.value = legendItem.datasetIndex || 0
				},
				onHover(e, legendItem, legend) {
					if (e.native && e.native.target) {
						const target = e.native.target as any
						target.style.cursor = 'pointer'
					}
				},
				onLeave(e, legendItem, legend) {
					if (e.native && e.native.target) {
						const target = e.native.target as any
						target.style.cursor = 'default'
					}
				},
				position: collapse.value ? 'right' : 'bottom',
				labels: {
					font: {
						size: 14,
						weight: '500',
						family: 'Noto Sans',
					},
					padding: 20,
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
					title([tooltipItem]) {
						return `Ngày ${tooltipItem.label}`
					},
				},
			},
		},
	}
})
</script>

<style scoped></style>
