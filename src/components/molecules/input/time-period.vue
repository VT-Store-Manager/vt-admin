<template>
	<v-row :class="{ 'is-readonly': inputProps?.readonly }">
		<v-col
			offset="1"
			cols="5"
		>
			<molecule-input
				v-bind="inputProps"
				:model-value="modelValue.start"
				input-type="autocomplete"
				:items="times"
				:menu-icon="getClockIcon(modelValue.start)"
				label="Open time"
				placeholder="From"
				:error-messages="errorMessage"
				@update:model-value="(v: string) => modelValue.start = v"
			/>
		</v-col>
		<v-col
			cols="1"
			class="pt-13 px-0"
		>
			<v-icon :icon="mdiArrowRight" />
		</v-col>
		<v-col cols="5">
			<molecule-input
				v-bind="inputProps"
				:model-value="modelValue.end"
				input-type="autocomplete"
				:items="times"
				:menu-icon="getClockIcon(modelValue.end)"
				label="Close time"
				:error-messages="errorMessage ? ' ' : ''"
				placeholder="To"
				hide-details
				@update:model-value="(v: string) => modelValue.end = v"
			/>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import {
	mdiArrowRight,
	mdiMenuUp,
	mdiClockTimeOneOutline,
	mdiClockTimeTwoOutline,
	mdiClockTimeThreeOutline,
	mdiClockTimeFourOutline,
	mdiClockTimeFiveOutline,
	mdiClockTimeSixOutline,
	mdiClockTimeSevenOutline,
	mdiClockTimeEightOutline,
	mdiClockTimeNineOutline,
	mdiClockTimeTenOutline,
	mdiClockTimeElevenOutline,
	mdiClockTimeTwelveOutline,
} from '@mdi/js'
import { CreateStoreModel } from '~/models'

interface Props {
	errorMessage?: string
	inputProps?: Record<string, any>
}

defineProps<Props>()

const modelValue = defineModel<CreateStoreModel['openTime']>({
	local: true,
	default: () => ({
		start: '',
		end: '',
	}),
})

const times = [...Array(23).keys()].reduce((res, cur) => {
	const hour = cur < 10 ? '0' + cur : cur
	return [...res, `${hour}:00`, `${hour}:30`]
}, [] as string[])

const getClockIcon = (time: string) => {
	if (!time) return mdiMenuUp

	switch (+time.slice(0, 2) % 12) {
		case 0:
			return mdiClockTimeTwelveOutline
		case 1:
			return mdiClockTimeOneOutline
		case 2:
			return mdiClockTimeTwoOutline
		case 3:
			return mdiClockTimeThreeOutline
		case 4:
			return mdiClockTimeFourOutline
		case 5:
			return mdiClockTimeFiveOutline
		case 6:
			return mdiClockTimeSixOutline
		case 7:
			return mdiClockTimeSevenOutline
		case 8:
			return mdiClockTimeEightOutline
		case 9:
			return mdiClockTimeNineOutline
		case 10:
			return mdiClockTimeTenOutline
		case 11:
			return mdiClockTimeElevenOutline
		default:
			return mdiMenuUp
	}
}
</script>

<style style="scss" scoped>
:deep(.v-input__details) {
	overflow: visible;
}
:deep(.v-messages__message),
:deep(.outside-label) {
	white-space: nowrap;
}
:deep(.v-field--appended) {
	padding-right: 8px;
}
.is-readonly {
	:deep(.v-icon) {
		pointer-events: none;
	}
}
</style>
