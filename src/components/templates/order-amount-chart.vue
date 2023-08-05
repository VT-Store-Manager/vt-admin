<template>
	<div class="main-chart">
		<v-row>
			<v-col cols="9">
				<Line
					:data="data"
					:options="options"
				/>
			</v-col>
		</v-row>
	</div>
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
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)
const data = {
	labels: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
	],
	datasets: [
		{
			label: 'Data One',
			backgroundColor: '#f87979',
			data: [41, 32, 10, 47, 63, 65, 70, 55, 75, 90, 85, 101, 122, 120],
		},
	],
}

const options = {
	maintainAspectRatio: true,
	responsive: true,
	plugins: {
		title: {
			display: true,
			text: 'Chart.js Line Chart - Cubic interpolation mode',
		},
	},
	interaction: {
		intersect: false,
	},
	tension: 0.4,
	scales: {
		x: {
			display: false,
			title: {
				display: true,
			},
		},
		y: {
			display: true,
			min: 0,
			title: {
				display: true,
				text: 'Value',
			},
		},
	},
}
</script>

<style scoped></style>
