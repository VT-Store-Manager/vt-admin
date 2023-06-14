<template>
	<v-icon
		v-if="value"
		icon="fa:fas fa-check-circle"
		color="success"
		v-bind="$attrs"
	/>
	<v-icon
		v-else
		icon="fa:fas fa-circle-xmark"
		color="red-darken-2"
		:class="{ 'd-none': hideFalse }"
		v-bind="$attrs"
	/>
</template>

<script lang="ts" setup>
interface Props {
	value?: boolean
	hideFalse?: boolean
}

withDefaults(defineProps<Props>(), {
	value: false,
	hideFalse: false,
})
</script>
