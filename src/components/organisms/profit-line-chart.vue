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
import { StatisticOrderAmountTime } from '~/models'
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

const type = ref<StatisticOrderAmountTime>('day')

const chartData = computed<ChartData<'line', number[], string>>(() => {
	return {
		labels: data.value ? ['', ...Object.keys(data.value[type.value])] : [],
		datasets: [
			{
				label: 'Tổng cộng',
				data: [
					0,
					...Object.values(data.value?.[type.value] || {}).map(
						order => order.totalProfit
					),
				],
				borderColor: '#ef6c00',
				borderWidth: 1.5,
				fill: true,
				backgroundColor: $createGradientCanvas('#ef6c00'),
			},
			{
				label: 'Giao hàng',
				data: [
					0,
					...Object.values(data.value?.[type.value] || {}).map(
						order => order.totalDeliveryOrderProfit
					),
				],
				borderColor: '#797DF2',
				borderWidth: 1.5,
				fill: true,
				backgroundColor: $createGradientCanvas('#797DF2'),
				hidden: true,
			},
			{
				label: 'Đến lấy',
				data: [
					0,
					...Object.values(data.value?.[type.value] || {}).map(
						order => order.totalPickupOrderProfit
					),
				],
				borderColor: '#49a096',
				borderWidth: 1.5,
				fill: true,
				backgroundColor: $createGradientCanvas('#49a096'),
				hidden: true,
			},
			{
				label: 'Đến cửa hàng',
				data: [
					0,
					...Object.values(data.value?.[type.value] || {}).map(
						order =>
							order.totalProfit -
							order.totalPickupOrderProfit -
							order.totalDeliveryOrderProfit
					),
				],
				borderColor: '#FE7AAA',
				borderWidth: 1.5,
				fill: true,
				backgroundColor: $createGradientCanvas('#FE7AAA'),
				hidden: true,
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
						size: 13,
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
					// title([tooltipItem]) {
					// 	return tooltipItem.label ? `Ngày ${tooltipItem.label}` : ''
					// },
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
		maxBy(Object.values(data.value?.[type.value] || {}), 'totalProfit')
			?.totalProfit || 0
	const unit = 200000
	return unit * Math.ceil(maxValue / unit)
}
</script>

<style lang="scss" scoped></style>
