<template>
	<template-page-container page-name="Store">
		<template #subtitle>
			<p>{{ storeGridStore.response?.data.maxCount || 0 }} stores</p>
		</template>
		<template #title-right>
			<base-progress-circular
				v-show="storeGridStore.loading"
				:class="{ done: !storeGridStore.loading }"
			/>
			<button-refresh
				class="mr-3"
				title="Refresh data"
				@click="refreshData"
			/>
			<button-create @click="$router.push('/store/create')">
				New store
			</button-create>
		</template>
		<store-grid
			v-if="!storeGridStore.error"
			:data="storeData"
		/>
		<p
			v-if="
				!storeGridStore.loading &&
				(storeGridStore.error || storeData.items.length === 0)
			"
			class="alternative-text"
		>
			{{ storeGridStore.error ? storeGridStore.error : 'No data' }}
		</p>
	</template-page-container>
</template>

<script lang="ts" setup>
import { StoreGridModel } from '~/models/store'

const storeGridStore = useStoreGrid()
const storeData = ref<StoreGridModel>(storeGridStore.defaultResponse)
const route = useRoute()

const refreshData = async () => {
	await storeGridStore.fetch()
	storeData.value = storeGridStore.response?.data
		? storeGridStore.response?.data
		: storeGridStore.defaultResponse
}

watch(storeGridStore.pagination, () => refreshData())

onBeforeMount(() => {
	const { page, limit } = route.query
	if (page && !isNaN(+page)) storeGridStore.pagination.page = +page
	if (limit && !isNaN(+limit)) storeGridStore.pagination.limit = +limit
	refreshData()
})
</script>
