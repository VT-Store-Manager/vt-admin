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

interface Props {
	title: string
	fieldName?: string
	sortable?: boolean
	sortingFieldName?: string
	textAlign?: 'left' | 'right' | 'center'
	showSortIcon?: boolean
}
const props = withDefaults(defineProps<Props>(), {
	fieldName: 'id',
	sortable: true,
	textAlign: 'left',
	showSortIcon: true,
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
