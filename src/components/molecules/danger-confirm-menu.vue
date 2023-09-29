<template>
	<v-menu location="top">
		<template #activator="{ props }">
			<v-icon
				v-bind="props"
				:size="16"
				color="red-darken-3"
				icon="fa:far fa-trash-can"
			/>
		</template>
		<v-sheet class="pa-3 mb-3 rounded-lg">
			<p class="text-15px font-weight-medium">Có chắc chắn xoá không ?</p>
			<div class="d-flex mx-n1 mt-2">
				<div class="w-50 px-1">
					<atom-btn
						variant="tonal"
						density="comfortable"
						block
						color="danger"
						@click="$emit('confirm')"
					>
						Có
					</atom-btn>
				</div>
				<div class="w-50 px-1">
					<atom-btn
						variant="tonal"
						density="comfortable"
						block
					>
						Không
					</atom-btn>
				</div>
			</div>
		</v-sheet>
	</v-menu>
</template>

<script setup lang="ts">
interface Props {
	title?: string
	mainText?: string
	extraText?: string
}

withDefaults(defineProps<Props>(), {
	title: 'Có chắc chắn xoá không ?',
	mainText: 'Có',
	extraText: 'Không',
})
defineEmits<{
	(e: 'confirm'): void
}>()
</script>

<style scoped></style>
