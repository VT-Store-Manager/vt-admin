<template>
	<th
		class="table-head bg-screen"
		:class="`text-${props.textAlign}`"
	>
		<v-btn
			variant="text"
			:ripple="false"
			class="font-weight-bold"
			color="dark-grey"
			:class="[...[props.showSortIcon ? [] : ['unused']]]"
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
import { useTheme } from 'vuetify/lib/framework.mjs'

interface Props {
	title: string
	textAlign?: 'left' | 'right' | 'center'
	sortable?: boolean
	fieldName?: string
	sortingFieldName?: string
	showSortIcon?: boolean
}
const props = withDefaults(defineProps<Props>(), {
	fieldName: 'id',
	sortable: true,
	textAlign: 'left',
	showSortIcon: true
})
const emit = defineEmits<{
	(e: 'sort', fieldName: string, isAsc: boolean): void
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
			white-space: break-spaces;
			text-align: left;
			position: relative;
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
			position: absolute;
			left: calc(100% - 6px);
			top: 50%;
			transform: translateY(-50%);
			&.hide {
				visibility: hidden;
			}
		}
		&:hover {
			.v-icon {
				visibility: visible !important;
			}
		}
		&.unused {
			cursor: default;
			:deep(.v-icon) {
				display: none;
			}
		}
	}
}
</style>
