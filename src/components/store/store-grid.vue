<template>
	<v-container fluid>
		<v-row>
			<v-col
				v-for="item in data.items"
				:key="item.id"
				cols="12"
				sm="6"
				md="4"
				lg="3"
				xl="2"
			>
				<store-grid-item :data="item" />
			</v-col>
		</v-row>
	</v-container>
	<base-pagination
		v-if="loaded"
		:current-page="storeGridStore.pagination.page"
		:max-per-page="storeGridStore.pagination.limit"
		:total-visible="5"
		:data-amount="data.maxCount"
		@change-page="changePage"
	/>
</template>

<script lang="ts" setup>
import { StoreGridModel } from '~/models/store'

interface Props {
	data: StoreGridModel
}

defineProps<Props>()

const loaded = ref(false)
const storeGridStore = useStoreGrid()

onBeforeMount(() => (loaded.value = false))
onMounted(() => (loaded.value = true))

const changePage = (currentPage: number, maxPerPage: number) => {
	storeGridStore.pagination.page = currentPage
	storeGridStore.pagination.limit = maxPerPage
}
</script>
