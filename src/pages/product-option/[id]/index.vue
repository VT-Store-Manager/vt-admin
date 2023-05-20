<template>
	<template-page-container page-name="Product option detail">
		<template #subtitle>
			<p>{{ optionDetailStore.response?.data.name ?? $route.params.id }}</p>
		</template>
		<template #title-right>
			<base-progress-circular
				v-show="optionDetailStore.loading"
				:class="{ done: !optionDetailStore.loading }"
			/>
			<button-refresh
				class="mr-3"
				title="Refresh data"
				@click="optionDetailStore.fetch()"
			/>
			<v-hover v-slot="{ isHovering, props }">
				<v-btn
					v-bind="props"
					color="red-darken-3"
					:variant="isHovering ? 'elevated' : 'outlined'"
				>
					Delete
				</v-btn>
			</v-hover>
			<button-primary
				:icon="mdiSquareEditOutline"
				color="yellow-darken-4"
				@click="$router.push(`${$route.params.id}/edit`)"
			>
				Edit
			</button-primary>
		</template>
	</template-page-container>
</template>

<script lang="ts" setup>
import { mdiSquareEditOutline } from '@mdi/js'

const optionDetailStore = useProductOptionDetail()

const refreshData = async () => {
	await optionDetailStore.fetch()
}

onBeforeMount(() => refreshData())

// const onEdit = () => {
// 	console.log('onEdit')
// }
</script>
