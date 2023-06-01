<template>
	<v-btn-toggle
		v-model="currentValue"
		:rounded="16"
		color="primary"
		group
		variant="outlined"
	>
		<v-btn
			v-for="(icon, index) in props.icons"
			:key="props.values[index]"
			:value="props.values[index]"
			:icon="icon"
			variant="text"
			color="grey"
			size="small"
			rounded="lg"
			:class="{ 'ml-1': index > 0 }"
		/>
	</v-btn-toggle>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
	icons: string[]
	values: string[]
}

const props = defineProps<Props>()

const currentValue = ref(props.values[0])
</script>

<style lang="scss" scoped>
.v-btn-group {
	height: 1.875rem;
	.v-btn {
		width: 1.875rem;
		opacity: 0.3;
		&.v-btn--active {
			opacity: 1;
		}
	}
}
</style>
