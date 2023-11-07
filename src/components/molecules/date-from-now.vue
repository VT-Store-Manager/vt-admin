<template>
	<p>
		<span>
			{{ displayText }}
			<v-tooltip
				activator="parent"
				location="left"
				:open-delay="500"
				v-bind="tooltipProps"
			>
				<atom-date-cell
					:date="date"
					time-format="HH:mm:ss"
					font-size="16"
				/>
			</v-tooltip>
		</span>
	</p>
</template>

<script lang="ts" setup>
import { VTooltip } from 'vuetify/components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
import capitalize from 'lodash/capitalize'

dayjs.extend(relativeTime)
dayjs.locale('vi')

interface VTooltipType extends /* @vue-ignore */ VTooltip {}
interface Props {
	date: number | string
	tooltipProps?: VTooltipType['$props']
	prefix?: string
	suffix?: string
}

const props = defineProps<Props>()
const { $dayjs } = useNuxtApp()

const now = useNow()
const diffTime = computed(() => {
	const diffAmount = now.value.getTime() - new Date(props.date).getTime()
	return $dayjs(Date.now() - diffAmount).fromNow()
})

const displayText = computed(() => {
	let text = diffTime.value
	if (props.prefix) {
		text = props.prefix + ' ' + text
	}
	if (props.suffix) {
		text = text + ' ' + props.suffix
	}

	return capitalize(text.trim().replace(/\s+/g, ' '))
})
</script>
