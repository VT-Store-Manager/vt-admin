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
			<molecule-btn-create @click="$router.push('/store/create')">
				New
			</molecule-btn-create>
			<molecule-btn-list-type-group
				class="ml-3"
				@update-type="type => (displayType = type)"
			/>
		</template>
		<template-store-list v-if="displayType === 'list'" />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ListDisplay } from '~/types'

const storeList = useStoreList()
const { totalCount } = storeToRefs(storeList)
const { refresh } = storeList
const displayType = ref<ListDisplay>('list')
</script>
