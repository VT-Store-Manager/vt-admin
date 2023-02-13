<template>
	<th
		class="table-head bg-screen"
		:class="`text-${props.textAlign}`"
	>
		<v-btn
			variant="text"
			:ripple="false"
			class="font-weight-bold"
			color="text-black"
			:class="[...[props.showSortIcon ? [] : ['unuse']]]"
			@click="onClick"
		>
			{{ title }}
			<v-icon
				:class="{ hide: hideIcon }"
				:icon="ascOrder ? mdiMenuDown : mdiMenuUp"
				:size="26"
			/>
		</v-btn>
	</th>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { mdiMenuDown, mdiMenuUp } from '@mdi/js'
import { ProductCategoryModel } from '~/types/models/product-category'

interface Props {
	title: string
	fieldName?: keyof ProductCategoryModel
	sortable?: boolean
	sortingFieldName?: keyof ProductCategoryModel
	textAlign?: 'left' | 'right' | 'center'
	showSortIcon?: boolean
}
const props = withDefaults(defineProps<Props>(), {
	fieldName: 'code',
	sortable: true,
	textAlign: 'left',
	showSortIcon: true
})
const emit = defineEmits<{
	(e: 'sort', fieldName: keyof ProductCategoryModel, isAsc: boolean): void
}>()

const ascOrder = ref(true)
const hideIcon = ref(true)

const onClick = () => {
	if (!props.sortable) return
	if (hideIcon.value) hideIcon.value = false
	ascOrder.value = !ascOrder.value
	emit('sort', props.fieldName, ascOrder.value)
}

watchEffect(() => {
	if (
		!props.fieldName ||
		!props.sortingFieldName ||
		props.fieldName !== props.sortingFieldName
	)
		hideIcon.value = true
	else hideIcon.value = false
})
</script>

<style lang="scss" scoped>
th.table-head {
	border: 0 !important;
	.v-btn {
		padding: 0;
		min-width: unset;
		:deep(.v-btn__content) {
			text-transform: uppercase !important;
			letter-spacing: normal;
		}
		&.text-right {
			* {
				text-align: right;
			}
		}
		&.text-center {
			* {
				text-align: center;
			}
		}
		:deep(.v-btn__overlay) {
			background-color: transparent;
		}
		.v-icon {
			&.hide {
				visibility: hidden;
			}
		}
		&:hover {
			.v-icon {
				visibility: visible !important;
			}
		}
		&.unuse {
			cursor: default;
			:deep(.v-icon) {
				display: none;
			}
		}
	}
}
</style>
