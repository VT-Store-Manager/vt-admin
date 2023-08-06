<template>
	<molecule-dashboard-card title="Thống kê đơn hàng">
		<template #title-right>
			<div class="d-flex align-center">
				<v-btn
					:icon="mdiDownload"
					density="comfortable"
					size="small"
					variant="text"
					color="red"
				/>
				<v-btn
					:icon="mdiCog"
					density="comfortable"
					size="small"
					variant="text"
					color="red"
					class="ml-1"
				/>
			</div>
		</template>
		<v-row class="transition-all">
			<v-col
				cols="12"
				class="transition-all"
			>
				<v-progress-circular v-if="pending" />
				<Line
					v-else
					:data="chartData"
					:options="chartOptions"
					class="transition-all"
				/>
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
import { mdiDownload, mdiCog } from '@mdi/js'
import { storeToRefs } from 'pinia'
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

const { data, pending } = storeToRefs(useStatisticOrderAmount())
const { $createGradientCanvas } = useNuxtApp()

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
				fill: true,
				backgroundColor: $createGradientCanvas(colors.orange),
				pointBackgroundColor: 'white',
			},
			{
				label: 'Tại cửa hàng',
				data: Object.values(data.value?.day || {}).map(
					order => order.inStoreCount
				),
				hidden: currentChart.value !== 1,
				borderColor: colors.green,
				fill: true,
				backgroundColor: $createGradientCanvas(colors.green),
				pointBackgroundColor: 'white',
			},
			{
				label: 'Mang đi',
				data: Object.values(data.value?.day || {}).map(
					order => order.pickupCount
				),
				hidden: currentChart.value !== 2,
				borderColor: colors.red,
				fill: true,
				backgroundColor: $createGradientCanvas(colors.red),
				pointBackgroundColor: 'white',
			},
			{
				label: 'Giao hàng',
				data: Object.values(data.value?.day || {}).map(
					order => order.deliveryCount
				),
				hidden: currentChart.value !== 3,
				borderColor: colors.blue,
				fill: true,
				backgroundColor: $createGradientCanvas(colors.blue),
				pointBackgroundColor: 'white',
			},
		],
	}
})

const chartOptions = computed<ChartOptions<'line'>>(() => {
	return {
		maintainAspectRatio: true,
		responsive: true,
		interaction: {
			intersect: false,
		},
		tension: 0.3,
		elements: {
			point: {
				radius: 5,
				borderWidth: 2,
				hoverRadius: 8,
				hoverBorderWidth: 2.5,
				hoverBackgroundColor: 'white',
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

				position: 'right',
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
			},
		},
	}
})
</script>

<style scoped></style>
