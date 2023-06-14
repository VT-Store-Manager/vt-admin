<template>
	<p>
		{{ moment(new Date(date)).fromNow() }}
		<v-tooltip
			activator="parent"
			location="bottom"
			:open-delay="500"
		>
			<atom-date-cell
				:date="date"
				time-format="hh:mm:ss"
				font-size="16"
			/>
		</v-tooltip>
	</p>
</template>

<script lang="ts" setup>
import moment from 'moment'

interface Props {
	date: number | string
}

defineProps<Props>()
</script>
