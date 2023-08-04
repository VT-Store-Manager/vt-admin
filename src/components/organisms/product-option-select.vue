<template>
	<molecule-input
		v-model="modelValue"
		:error-messages="errorMessages"
		input-type="select"
		label="Product options"
		:items="selectDataList"
		:loading="pending"
		chips
		closable-chips
		clearable
		multiple
	>
		<template #item="{ item }">
			<v-checkbox-btn
				v-model="modelValue"
				class="px-3 py-1 text-16px"
				:label="item.title"
				:value="item.value"
				:disabled="(item.raw as any).disabled"
			/>
		</template>
	</molecule-input>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { MoleculeInput } from '#components'

interface Props {
	errorMessages?: string | string[]
}

defineProps<Props>()
const modelValue = defineModel<string[]>({ default: () => [], local: true })
const productOptionSelect = useProductOptionSelect()
const { pending, selectDataList } = storeToRefs(productOptionSelect)
const { setSelectedValues } = productOptionSelect

onUnmounted(() => {
	setSelectedValues([])
})
</script>

<style scoped></style>
