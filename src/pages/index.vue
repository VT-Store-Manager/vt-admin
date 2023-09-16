<template>
	<molecule-list-page-container
		page-name="Dashboard"
		scroll
	>
		<template #title-right>
			<molecule-btn-refresh
				title="Làm mới"
				@click="refresh"
			/>
		</template>
		<template-statistic-charts />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
const statisticTotalAmount = useStatisticTotalAmount()
const statisticMemberAmount = useStatisticMemberRank()
const statisticOrderAmount = useStatisticOrderAmount()
const saleRanking = useSaleRanking()
const saleCategory = useSaleCategory()

const refresh = () => {
	saleRanking.refresh()
	saleCategory.refresh()
	statisticTotalAmount.refresh()
	statisticMemberAmount.refresh()
	statisticOrderAmount.refresh()
}
</script>

<style lang="scss" scoped>
:deep(span),
:deep(p) {
	color: #333;
}
</style>
