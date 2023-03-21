<template>
	<template-page-container page-name="Store">
		<template #subtitle>
			<p>{{ store.data?.length || 0 }} stores</p>
		</template>
		<template #title-right>
			<v-progress-circular
				v-show="store.loading"
				:class="{ done: !store.loading }"
				class="mr-3"
				indeterminate
				color="primary"
				:size="24"
				:width="5"
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
		<base-grid
			v-if="!store.error && store.data?.length"
			:col="4"
			:data="storeData"
			:item-per-page="store.pagination"
		>
			<template #default="{ data }">
				<store-grid-item :data="data" />
			</template>
		</base-grid>
		<p
			v-if="store.error || store.data?.length === 0"
			class="alternative-text"
		>
			{{ store.error ? store.error : 'No data' }}
		</p>
	</template-page-container>
</template>

<script lang="ts" setup>
import { StoreGridItemModel } from '~/models/store'

const store = useStore()
const storeData = ref<StoreGridItemModel[]>([])

const refreshData = async () => {
	await store.fetch()
	storeData.value = store.data ? [...store.data] : []
}

refreshData()
</script>
