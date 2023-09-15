<template>
	<molecule-dashboard-card
		title="Mật độ điểm"
		option-button
	>
		<v-row class="pr-4">
			<v-col
				cols="12"
				:style="{ height: '350px' }"
			>
				<v-progress-circular v-if="pending" />
				<template v-else>
					<Scatter
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
	Legend,
	ChartData,
	ChartOptions,
	Filler,
	Colors,
} from 'chart.js'
import { Scatter } from 'vue-chartjs'
import { transparentize } from 'polished'
import orderBy from 'lodash/orderBy'
import { ShortMemberData } from '~/models'

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
const { data, pending } = storeToRefs(useStatisticMemberRank())

const memberPoints = computed(() => {
	if (!data.value) return []
	return data.value.reduce((res, rank) => {
		return [
			...res,
			...rank.members.map(member => ({ ...member, color: rank.color })),
		]
	}, [] as Array<ShortMemberData & { color: string }>)
})

const memberNamesWithPoint = computed(() =>
	memberPoints.value.reduce((res, member) => {
		const list = res[member.point] || []
		list.push(member.name)
		res[member.point] = list
		return res
	}, {} as Record<number, string[]>)
)

const chartData = computed<ChartData<'scatter', number[], string>>(() => {
	return {
		datasets: [
			{
				data: orderBy(
					memberPoints.value.map((member, index) => ({
						x: index,
						y: member.point,
					})),
					['y'],
					['asc']
				) as any,
				fill: true,
				backgroundColor: memberPoints.value.map(member =>
					transparentize(0.6, member.color)
				),
				borderWidth: 0,
			},
		],
	}
})

const chartOptions = computed<ChartOptions<'scatter'>>(() => {
	return {
		maintainAspectRatio: false,
		responsive: true,
		interaction: {
			intersect: false,
		},
		elements: {
			point: {
				radius: 8,
				hoverRadius: 10,
			},
		},
		scales: {
			x: {
				type: 'linear',
				position: 'bottom',
				display: true,
				title: {
					display: false,
				},
				ticks: {
					display: false,
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
					stepSize: 500,
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
				position: 'average',
				callbacks: {
					label(tooltipItems) {
						const point: number = (tooltipItems.raw as any).y
						// const names = memberNamesWithPoint.value[point]
						return `${point} BEAN`
					},
					footer(tooltipItems) {
						const point: number = (tooltipItems[0].raw as any).y
						const names = memberNamesWithPoint.value[point]
						names.sort()
						return names.join('\n')
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
