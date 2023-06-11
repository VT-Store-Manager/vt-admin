<template>
	<v-btn-toggle
		v-model="displayType"
		density="compact"
		mandatory
		selected-class="selected-type"
		variant="outlined"
		class="list-type-btns elevation-2"
		:class="{ dark: isDark }"
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
import { storeToRefs } from 'pinia'
import { ListDisplay } from '~/types'

const displayType = ref<ListDisplay>('list')
const emits = defineEmits<{
	(e: 'updateType', type: ListDisplay): void
}>()

watch(displayType, value => {
	emits('updateType', value)
})
const { isDark } = storeToRefs(useThemeUtil())
</script>

<style lang="scss" scoped>
.list-type-btns {
	border-radius: 8px;
	width: 70px;
	.list-type-item {
		flex: 1;
		&:first-child {
			:deep(.v-btn__overlay) {
				border-top-left-radius: 7px;
				border-bottom-left-radius: 7px;
			}
		}
		&:last-child {
			:deep(.v-btn__overlay) {
				border-top-right-radius: 7px;
				border-bottom-right-radius: 7px;
			}
		}
		:deep(.v-btn__content) {
			opacity: 0.2;
			svg {
				color: black;
			}
		}
		&.selected-type {
			:deep(.v-btn__content) {
				opacity: 1;
			}
		}
	}
	&.dark {
		.list-type-item {
			:deep(.v-btn__content) {
				opacity: 0.5;
				svg {
					color: #fff3;
				}
			}
			&.selected-type {
				:deep(.v-btn__content) {
					opacity: 1;
					svg {
						color: #fff;
					}
				}
			}
		}
	}
}
</style>
