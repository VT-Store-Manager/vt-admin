<template>
	<p>
		<span>
			{{
				moment(new Date(Date.now() - diffTime))
					.locale('vi')
					.fromNow()
			}}
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

const props = defineProps<Props>()

const now = useNow()
const diffTime = computed(() => {
	return now.value.getTime() - new Date(props.date).getTime()
})
</script>
