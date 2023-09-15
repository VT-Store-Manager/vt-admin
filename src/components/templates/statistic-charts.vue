<template>
	<div class="statistic-charts mt-2">
		<v-row>
			<v-col cols="12">
				<organism-statistic-overall-amount />
			</v-col>
			<v-col
				:lg="collapse ? 9 : 8"
				cols="8"
			>
				<organism-profit-line-chart />
			</v-col>
			<v-col
				:lg="collapse ? 3 : 4"
				cols="4"
			>
				<organism-best-selling-product />
			</v-col>
			<v-col cols="4">
				<organism-order-doughnut-chart />
			</v-col>
			<v-col cols="8">
				<organism-order-line-chart />
			</v-col>
			<v-col cols="9">
				<organism-category-sale-chart />
			</v-col>
			<v-col cols="3">
				<organism-order-buyer-chart />
			</v-col>
			<v-col
				cols="6"
				lg="5"
			>
				<organism-member-rank-chart />
			</v-col>
			<v-col
				cols="6"
				lg="7"
			>
				<organism-member-scatter-chart />
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
const { collapse } = storeToRefs(useSidebar())
</script>

<style scoped>
.v-col {
	transition: all 0.3s;
}
</style>
