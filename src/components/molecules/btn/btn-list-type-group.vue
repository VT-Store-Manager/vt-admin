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
			:ripple="false"
		/>
		<v-btn
			:icon="mdiViewGridOutline"
			value="grid"
			class="list-type-item"
			:ripple="false"
		/>
	</v-btn-toggle>
</template>

<script lang="ts" setup>
import { mdiListBoxOutline, mdiViewGridOutline } from '@mdi/js'

import { ListDisplay } from '~/types'

const displayType = defineModel<ListDisplay>('displayType', {
	default: 'list',
	local: true,
})
const { isDark } = storeToRefs(useThemeUtil())

onBeforeMount(() => {
	const type = displayType.value
	displayType.value = undefined
	setTimeout(() => {
		displayType.value = type
	}, 0)
})
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
		:deep(.v-btn__overlay) {
			opacity: 0.1;
		}
		:deep(.v-btn__content) {
			color: #aaa;
		}
		&.selected-type {
			box-shadow: 0 0 10px #0004;
			:deep(.v-btn__overlay) {
				opacity: 0;
			}
			:deep(.v-btn__content) {
				color: black;
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
