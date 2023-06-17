<template>
	<v-card
		rounded="12"
		class="elevation-3 px-2 pt-2"
	>
		<template
			v-for="slot in slotNames"
			:key="slot"
			#[slot]
		>
			<slot :name="slot"></slot>
		</template>
	</v-card>
</template>

<script lang="ts" setup>
import type { VCard } from 'vuetify/components'

interface VCardType extends /* @vue-ignore */ VCard {}
interface Props {}

defineProps<Props & VCardType['$props']>()
const slots = useSlots()

const slotNames = computed(
	() => Object.keys(slots) as (keyof VCardType['$slots'])[]
)
</script>
