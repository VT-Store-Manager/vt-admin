<template>
	<v-chip
		size="small"
		variant="elevated"
		:color="
			computedState === PublishStatus.NOT_YET
				? 'blue-grey-lighten-2'
				: computedState === PublishStatus.OPENING
				? 'light-blue-darken-2'
				: 'deep-purple-lighten-1'
		"
		v-bind="$attrs"
	>
		{{ computedState }}
		<v-tooltip
			activator="parent"
			location="left"
		>
			<div class="d-flex w-100">
				<div class="mr-4">
					<p>Start time:</p>
					<p v-if="finishTime">Finish time:</p>
					<p>Timer:</p>
					<p>Duration:</p>
				</div>
				<div>
					<p class="text-right">
						{{ moment(startTime).format('YYYY-MM-DD hh:mm:ss') }}
					</p>
					<p
						v-if="finishTime"
						class="text-right"
					>
						{{ moment(finishTime).format('YYYY-MM-DD hh:mm:ss') }}
					</p>
					<p class="text-right">
						{{ getTimeDiffFormat(now, startDate) }}
					</p>
					<p class="text-right">
						{{
							finishDate ? getTimeDiffFormat(finishDate, startDate) : 'Infinity'
						}}
					</p>
				</div>
			</div>
		</v-tooltip>
	</v-chip>
</template>

<script lang="ts" setup>
import moment from 'moment'
import { PublishStatus } from '~/constants'

interface Props {
	startTime: number | string | Date
	finishTime?: number | string | Date
}

const props = defineProps<Props>()
const now = useNow()

const startDate = computed(() => {
	return new Date(props.startTime)
})
const finishDate = computed(() => {
	if (!props.finishTime) return null
	return new Date(props.finishTime)
})
const computedState = computed(() => {
	if (now.value < startDate.value) {
		return PublishStatus.NOT_YET
	}
	if (finishDate.value) {
		if (now.value < finishDate.value) {
			return PublishStatus.OPENING
		}
		return PublishStatus.CLOSED
	}
	return PublishStatus.OPENING
})

const getTimeDiffFormat = (date1: Date, date2: Date) => {
	const timeDuration = moment.duration(
		date1 < date2
			? moment(date2).diff(moment(date1))
			: moment(date1).diff(moment(date2))
	)
	if (timeDuration.as('months') >= 1) {
		const totalDaysOfMonth = moment().add(timeDuration).daysInMonth()
		timeDuration.add(totalDaysOfMonth - 1, 'days')
	}
	return moment
		.utc(timeDuration.as('milliseconds'))
		.format('M[M] d[d] HH[h] mm[m] ss[s]')
}
</script>
