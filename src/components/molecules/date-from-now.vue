<template>
	<p>
		<span>
			{{ diffTime }}
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
interface Props {
	date: number | string
}

const props = defineProps<Props>()
const { $moment } = useNuxtApp()
const now = useNow()

const diffTime = computed(() => {
	const diffAmount = now.value.getTime() - new Date(props.date).getTime()
	return $moment(new Date(Date.now() - diffAmount)).fromNow()
})
</script>
