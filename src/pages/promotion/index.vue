<template>
	<molecule-list-page-container page-name="Promotions">
		<template #subtitle>
			<p>{{ totalCount }} promotion{{ totalCount > 1 ? 's' : '' }}</p>
		</template>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Refresh"
				:loading="pending"
				@click="refresh"
			/>
			<molecule-btn-create @click="$router.push('/promotion/create')">
				New
			</molecule-btn-create>
		</template>
		<template-promotion-list />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
const promotionList = usePromotionList()
const { totalCount, pending } = storeToRefs(promotionList)
const { refresh, pushQuery } = promotionList

pushQuery()
</script>
