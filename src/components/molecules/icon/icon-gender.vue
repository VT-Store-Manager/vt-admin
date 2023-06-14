<template>
	<v-icon
		:icon="genderDisplay.icon"
		size="16px"
		class="icon-gender"
		:color="genderDisplay.color"
		v-bind="$attrs"
	/>
</template>

<script lang="ts" setup>
import { Gender } from '~/constants'

interface Props {
	gender: keyof typeof Gender
}

const props = defineProps<Props>()

const genderDisplay = computed(() => {
	switch (props.gender) {
		case 1:
			return {
				icon: 'fa:fas fa-venus',
				color: 'red-darken-2',
			}
		case 2:
			return {
				icon: 'fa:fas fa-mars-and-venus',
				color: 'purple-darken-2',
			}
		case 0:
		default:
			return {
				icon: 'fa:fas fa-mars',
				color: 'indigo-lighten-1',
			}
	}
})
</script>

<style lang="scss" scoped></style>
