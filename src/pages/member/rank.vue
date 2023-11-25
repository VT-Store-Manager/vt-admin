<template>
	<molecule-list-page-container page-name="Cấp bậc thành viên">
		<template #subtitle>
			<p>{{ totalCount }} cấp bậc</p>
		</template>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Làm mới"
				@click="refresh"
			/>
			<molecule-btn-create @click="$router.push('/rank/create')">
				Tạo mới
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
