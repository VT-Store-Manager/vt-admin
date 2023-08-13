<template>
	<molecule-list-page-container page-name="Ranks">
		<template #subtitle>
			<p>{{ totalCount }} rank{{ totalCount > 1 ? 's' : '' }}</p>
		</template>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Refresh"
				@click="refresh"
			/>
			<molecule-btn-create @click="$router.push('/rank/create')">
				New
			</molecule-btn-create>
		</template>
		<template-rank-list />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>


const rankList = useRankList()
const { totalCount } = storeToRefs(rankList)
const { refresh } = rankList
</script>
