<template>
	<molecule-list-page-container page-name="Stores">
		<template #subtitle>
			<p>{{ totalCount }} store{{ totalCount > 1 ? 's' : '' }}</p>
		</template>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Refresh data"
				@click="refresh"
			/>
			<molecule-btn-create @click="showCreateDialog = true">
				New
			</molecule-btn-create>
			<molecule-btn-list-type-group
				class="ml-3"
				@update-type="(type: ListDisplay) => (displayType = type)"
			/>
		</template>
		<template-store-list v-if="displayType === 'list'" />
		<template-store-grid v-else-if="displayType === 'grid'" />
		<template-new-store-dialog v-model:show="showCreateDialog" />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ListDisplay } from '~/types'

const storeList = useStoreList()
const { totalCount } = storeToRefs(storeList)
const { refresh, pushQuery } = storeList
const displayType = ref<ListDisplay>('list')
const showCreateDialog = ref(false)

pushQuery()
</script>
