<template>
	<v-row>
		<v-col cols="8">
			<v-text-field
				v-model="item.name"
				:disabled="props.disableName"
				label="Option item name"
				class="mr-4"
			/>
		</v-col>
		<v-col>
			<v-text-field
				v-model="item.cost"
				label="Option item cost"
				type="number"
			/>
		</v-col>
		<v-col cols="1">
			<v-btn
				:icon="mdiTrashCan"
				:disabled="props.disableDelete"
				variant="text"
				color="red-darken-2"
				@click="$emit('deleteItem')"
			/>
		</v-col>
	</v-row>
</template>

<script lang="ts" setup>
import { mdiTrashCan } from '@mdi/js'
import { ProductOptionItem } from '~/types/models/product-option'

interface Props {
	item: ProductOptionItem
	disableName?: boolean
	disableDelete?: boolean
}
const props = withDefaults(defineProps<Props>(), {
	disableName: false,
	disableDelete: false
})
const emits = defineEmits<{
	(e: 'deleteItem'): void
	(e: 'updateName', name: string): void
	(e: 'updateCost', cost: number): void
}>()

const item = reactive(props.item)

watch(
	() => item.name,
	() => {
		emits('updateName', item.name)
	}
)
watch(
	() => item.cost,
	() => {
		emits('updateCost', item.cost)
	}
)
</script>

<style lang="scss" scoped>
.v-text-field {
	:deep(.v-input__details) {
		display: none;
	}
}
</style>
