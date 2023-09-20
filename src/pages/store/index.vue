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
		<template-store-grid v-if="displayType === 'grid'" />
		<template-store-list v-else />
		<template-new-store-dialog v-model:show="showCreateDialog" />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
import { STORE_DISPLAY_KEY } from '~/constants'
import { ListDisplay } from '~/types'

const storeList = useStoreList()
const { totalCount } = storeToRefs(storeList)
const { refresh, pushQuery } = storeList
const showCreateDialog = ref(false)
const displayType = useCookie<ListDisplay>(STORE_DISPLAY_KEY, {
	watch: 'shallow',
	maxAge: 60 * 60 * 24 * 365,
})

pushQuery()
</script>
