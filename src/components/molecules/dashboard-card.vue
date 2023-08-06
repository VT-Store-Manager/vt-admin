<template>
	<v-card
		rounded="12"
		class="elevation-2"
	>
		<v-card-title>
			<div class="d-flex justify-space-between align-center">
				<p class="text-15px font-weight-bold">
					{{ title }}
				</p>
				<slot name="title-right"></slot>
			</div>
		</v-card-title>
		<v-card-item class="px-2 pb-4">
			<div class="bg-gray">
				<slot></slot>
			</div>
		</v-card-item>
	</v-card>
</template>

<script lang="ts" setup>
interface Props {
	title: string
}

defineProps<Props>()
defineSlots<{
	'title-right'?: (props: any) => any
	default: (props: any) => any
}>()
</script>

<style lang="scss" scoped></style>
