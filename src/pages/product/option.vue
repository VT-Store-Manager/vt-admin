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
		<template-product-create-dialog v-model:show="showCreateDialog" />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
import { SHOW_SUB_OPTION_LIST } from '~/constants'

const productOptionList = useProductOptionList()
const { totalCount } = storeToRefs(productOptionList)
const { refresh } = productOptionList
const showCreateDialog = ref(false)
const showChildOptions = useCookie<boolean>(SHOW_SUB_OPTION_LIST, {
	watch: 'shallow',
	maxAge: 60 * 60 * 24 * 365,
})
</script>
