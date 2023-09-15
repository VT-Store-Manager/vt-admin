<template>
	<molecule-dashboard-card
		title="Cấp bậc thành viên"
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
					/>
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
	ChartData,
	ChartOptions,
	Filler,
	Colors,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { lighten } from 'polished'

ChartJS.register(
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	// Legend,
	Filler,
	Colors
)
const { data, pending } = storeToRefs(useStatisticMemberRank())

const chartData = computed<ChartData<'bar', number[], string>>(() => {
	return {
		labels: (data.value || []).map(rank => rank.name),
		datasets: [
			{
				label: 'Số lượng',
				data: (data.value || []).map(rank => rank.members.length),
				fill: true,
				backgroundColor: (data.value || []).map(rank =>
					lighten(0.2, rank.color)
				),
				borderColor: (data.value || []).map(rank => rank.color),
				barPercentage: 0.5,
			},
		],
	}
})

const chartOptions = computed<ChartOptions<'bar'>>(() => {
	return {
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
					stepSize: 1,
				},
				grid: {
					display: true,
					color: 'rgba(0, 0, 0, 0.05)',
				},
			},
		},
		plugins: {
			legend: {
				display: false,
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

<style lang="scss" scoped></style>
