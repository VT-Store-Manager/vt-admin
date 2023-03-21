<template>
	<v-container fluid>
		<v-row>
			<v-col
				v-for="item in data"
				:key="item.id"
				cols="12"
				sm="6"
				md="4"
				lg="3"
				xl="2"
			>
				<slot :data="item"></slot>
			</v-col>
		</v-row>
	</v-container>
	<base-pagination
		v-if="loaded"
		:current-page="1"
		:max-per-page="6"
		:total-visible="5"
		:data-amount="data.length"
		@change-page="changePage"
	/>
</template>

<script lang="ts" setup>
import { StoreGridItemModel } from '~/models/store'

interface Props {
	col: number
	data: StoreGridItemModel[]
	itemPerPage: number
}

defineProps<Props>()

const loaded = ref(false)

onBeforeMount(() => (loaded.value = false))
onMounted(() => (loaded.value = true))

const changePage = (currentPage: number, maxPerPage: number) => {
	console.log(`Page: ${currentPage}, max: ${maxPerPage}`)
}
</script>
