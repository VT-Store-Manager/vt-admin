<template>
	<molecule-list-page-container page-name="Product options">
		<template #subtitle>
			<p>{{ totalCount || '--' }} option{{ totalCount > 1 ? 's' : '' }}</p>
		</template>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Refresh data"
				@click="refresh"
			/>
			<atom-btn
				class="mr-3"
				@click="showChildOptions = !showChildOptions"
			>
				{{ showChildOptions ? 'Hide' : 'Show' }} child
			</atom-btn>
			<molecule-btn-create @click="showCreateDialog = true">
				New
			</molecule-btn-create>
		</template>
		<template-product-option-list :hide-child="showChildOptions" />
		<template-new-product-dialog v-model:show="showCreateDialog" />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const productOptionList = useProductOptionList()
const { totalCount } = storeToRefs(productOptionList)
const { refresh, pushQuery } = productOptionList
const showCreateDialog = ref(false)
const showChildOptions = ref(false)
pushQuery()
</script>
