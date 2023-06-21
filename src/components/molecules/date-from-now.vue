<template>
	<p>
		<span>
			{{ moment(new Date(date)).fromNow() }}
			<v-tooltip
				activator="parent"
				location="left"
				:open-delay="500"
			>
				<atom-date-cell
					:date="date"
					time-format="hh:mm:ss"
					font-size="16"
				/>
			</v-tooltip>
		</span>
	</p>
</template>

<script lang="ts" setup>
import moment from 'moment'

interface Props {
	date: number | string
}

defineProps<Props>()
</script>
