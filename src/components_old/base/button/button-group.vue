<template>
	<v-btn-toggle
		v-model="currentValue"
		color="primary"
		group
		variant="outlined"
		rounded="lg"
	>
		<v-btn
			v-for="value in props.values"
			:key="value"
			:ripple="false"
			:value="value"
			@click="changeTab(value)"
		>
			{{ capitalize(value) }}
		</v-btn>
	</v-btn-toggle>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { capitalize } from 'lodash'

interface Props {
	values: string[]
}

const props = defineProps<Props>()
const emits = defineEmits<{
	(e: 'changeTab', value: string): void
}>()

const currentValue = ref<string>(props.values[0])

const changeTab = (value: string) => {
	currentValue.value = value
	emits('changeTab', value)
}
</script>

<style lang="scss" scoped>
.v-btn-group {
	height: 2.25rem;
	.v-btn {
		:deep(.v-btn__content) {
			text-transform: none;
		}
	}
}
</style>
