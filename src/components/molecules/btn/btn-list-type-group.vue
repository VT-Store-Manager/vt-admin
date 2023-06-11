<template>
	<v-btn-toggle
		v-model="displayType"
		density="compact"
		mandatory
		selected-class="selected-type"
		variant="outlined"
		class="list-type-btns"
	>
		<v-btn
			:icon="mdiListBoxOutline"
			value="list"
			class="list-type-item"
		/>
		<v-btn
			:icon="mdiViewGridOutline"
			value="grid"
			class="list-type-item"
		/>
	</v-btn-toggle>
</template>

<script lang="ts" setup>
import { mdiListBoxOutline, mdiViewGridOutline } from '@mdi/js'
import { ListDisplay } from '~/types/layout'

const displayType = ref<ListDisplay>('list')
const emits = defineEmits<{
	(e: 'updateType', type: ListDisplay): void
}>()

watch(displayType, value => {
	emits('updateType', value)
})
</script>

<style lang="scss" scoped>
.list-type-btns {
	border-radius: 8px;
	width: 70px;
	.list-type-item {
		flex: 1;
		:deep(.v-btn__content) {
			svg {
				color: #0003;
			}
		}
		&.selected-type {
			:deep(.v-btn__content) {
				svg {
					color: black;
				}
			}
		}
	}
}
</style>
