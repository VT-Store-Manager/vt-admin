<template>
	<v-card
		v-if="show"
		v-click-outside="{
			handler: () => $emit('click:cancel')
		}"
		class="confirm-delete"
	>
		<v-card-text> Are you sure to delete item ? </v-card-text>
		<v-card-actions class="justify-end">
			<v-btn
				variant="text"
				@click="$emit('click:cancel')"
			>
				No
			</v-btn>
			<v-btn
				color="red-darken-2"
				@click="$emit('click:confirm-delete')"
			>
				Delete
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts" setup>
interface Props {
	show?: boolean
}

withDefaults(defineProps<Props>(), {
	show: false
})
defineEmits<{
	(e: 'click:cancel'): void
	(e: 'click:confirm-delete'): void
}>()
</script>

<style lang="scss" scoped>
.v-card.confirm-delete {
	position: absolute;
	bottom: 100%;
	right: 0;
	z-index: 9999;
}
</style>
