<template>
	<molecule-dashboard-card
		title="Doanh thu bán hàng"
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
						:data="chartData"
						:options="chartOptions"
					/>
				</template>
			</v-col>
		</v-row>
	</molecule-dashboard-card>
</template>

<script lang="ts" setup>
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
const { data, pending } = storeToRefs(useStatisticOrderAmount())
const { $createGradientCanvas } = useNuxtApp()

const chartData = computed<ChartData<'line', number[], string>>(() => {
	return {
		labels: data.value ? Object.keys(data.value.day) : [],
		datasets: [
			{
				label: 'Giao hàng',
				data: Object.values(data.value?.day || {}).map(
					order => order.totalProfit - order.totalDeliveryOrderProfit
				),
				borderColor: '#797DF2',
				borderWidth: 1.5,
				fill: true,
				backgroundColor: $createGradientCanvas('#797DF2'),
			},
			{
				label: 'Đến cửa hàng',
				data: Object.values(data.value?.day || {}).map(
					order => order.totalDeliveryOrderProfit
				),
				borderColor: '#FE7AAA',
				borderWidth: 1.5,
				fill: true,
				backgroundColor: $createGradientCanvas('#FE7AAA'),
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
		tension: 0.3,
		elements: {
			point: {
				radius: 0,
				hoverBackgroundColor: 'white',
				hoverRadius: 5,
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
				max: getMaxValue(),
				display: true,
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
				callbacks: {
					label(tooltipItems) {
						return `${tooltipItems.dataset.label}: ${tooltipItems.formattedValue} đ`
					},
					title([tooltipItem]) {
						return `Ngày ${tooltipItem.label}`
					},
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

const getMaxValue = () => {
	const maxValue =
		maxBy(Object.values(data.value?.day || {}), 'totalProfit')?.totalProfit || 0
	const unit = 200000
	return unit * Math.ceil(maxValue / unit)
}
</script>

<style lang="scss" scoped></style>
