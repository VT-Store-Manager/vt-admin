<template>
	<molecule-dashboard-card
		title="Doanh số theo loại"
		option-button
	>
		<v-row>
			<v-col
				cols="12"
				:style="{ height: '350px' }"
			>
				<v-progress-circular v-if="pending" />
				<template v-else>
					<Bar
						:data="chartData"
						:options="chartOptions"
					/>s
				</template>
			</v-col>
		</v-row>
	</molecule-dashboard-card>
</template>

<script lang="ts" setup>
import {
	BarElement,
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
	Colors,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	Colors
)
const { sortBySaleData, pending } = storeToRefs(useSaleCategory())

const chartData = computed<ChartData<'bar', number[], string>>(() => {
	return {
		labels: (sortBySaleData.value || []).map(category => category.name),
		datasets: [
			{
				label: 'Doanh số',
				type: 'bar',
				data: (sortBySaleData.value || []).map(category => category.saleVolume),
				fill: true,
				xAxisID: 'x',
			},
			{
				label: 'Doanh thu',
				type: 'bar',
				data: (sortBySaleData.value || []).map(
					category => category.profit / 1000
				),
				fill: true,
				xAxisID: 'profit',
			},
		],
	}
})

const chartOptions = computed<ChartOptions<'bar'>>(() => {
	return {
		indexAxis: 'y',
		maintainAspectRatio: false,
		responsive: true,
		interaction: {
			intersect: false,
		},
		tension: 0.3,
		elements: {
			bar: {
				borderWidth: 2,
			},
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
					display: true,
					font: {
						family: 'Noto Sans',
						weight: '600',
						size: 13,
					},
					padding: 8,
				},
				grid: {
					display: false,
				},
			},
			y: {
				beginAtZero: true,
				position: 'bottom',
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
			profit: {
				beginAtZero: true,
				display: true,
				position: 'top',
				title: {
					display: true,
					text: 'Doanh thu (nghìn đồng)',
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
						size: 13,
					},
					padding: 8,
				},
				grid: {
					display: false,
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
				position: 'average',
				callbacks: {
					label(tooltipItems) {
						const label = `${tooltipItems.dataset.label}: ${tooltipItems.formattedValue}`
						if (tooltipItems.datasetIndex === 1) {
							return label + ' đ'
						}
						return label + ' sản phẩm'
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
</script>

<style lang="scss" scoped></style>
