<template>
	<div class="statistic-charts mt-2">
		<v-row>
			<v-col cols="12">
				<organism-statistic-overall-amount />
			</v-col>
			<v-col cols="8">
				<organism-profit-line-chart />
			</v-col>
			<v-col cols="4">
				<organism-best-selling-product />
			</v-col>
			<v-col cols="6">
				<organism-order-line-chart />
			</v-col>
			<v-col cols="3">
				<organism-order-doughnut-chart />
			</v-col>
			<v-col cols="3">
				<organism-order-buyer-chart />
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
