<template>
	<v-btn
		v-bind="$attrs"
		rounded="lg"
		class="btn"
	>
		<template
			v-for="slot in slotNames"
			:key="slot"
			#[slot]
		>
			<v-tooltip
				v-if="slot === 'default' && tooltip"
				activator="parent"
				open-delay="500"
				:location="tooltipPosition"
				:text="tooltip"
			/>
			<slot :name="slot"></slot>
		</template>
	</v-btn>
</template>

<script lang="ts" setup>
import { VBtn, VTooltip } from 'vuetify/components'

interface VBtnType extends /* @vue-ignore */ VBtn {}
interface Props {
	tooltip?: string
	tooltipPosition?: VTooltip['$props']['location']
}

defineProps<VBtnType['$props'] & Props>()

const slotNames = Object.keys(useSlots()) as (keyof VBtn['$slots'])[]
</script>
