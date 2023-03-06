<template>
	<v-btn
		class="secondary-button"
		rounded="lg"
		variant="tonal"
		color="grey-darken"
		@click="$emit('click')"
	>
		<v-icon
			v-if="icon"
			:icon="icon"
		/>
		<template v-if="$slots.default">
			<slot></slot>
		</template>
		<template v-else>
			{{ text }}
		</template>
	</v-btn>
</template>

<script lang="ts" setup>
interface Props {
	text?: string
	icon?: string
}

defineProps<Props>()
defineEmits<{
	(e: 'click'): void
}>()
</script>

<style lang="scss" scoped>
.v-btn.secondary-button {
	height: 2.5rem;
	:deep(.v-btn__content) {
		text-transform: none;
		line-height: 1.25;
		font-weight: 600;
		font-size: 0.875rem;
	}
	.v-icon {
		font-size: 0.875rem;
		margin-right: 5px;
	}
}
</style>
