<template>
	<v-btn-group
		class="button-actions w-100 align-center justify-end"
		:class="{ 'only-icon': !showText }"
	>
		<template v-if="!showText">
			<v-tooltip
				v-if="props.edit"
				text="Edit"
				location="top"
			>
				<template #activator="{ props: propsTooltip1 }">
					<v-icon
						v-bind="propsTooltip1"
						:size="16"
						color="yellow-darken-4"
						icon="fa:far fa-pen-to-square"
						class="mr-5"
						@click="$emit('click:edit')"
					/>
				</template>
			</v-tooltip>
			<v-tooltip
				v-if="props.delete"
				text="Delete"
				location="top"
			>
				<template #activator="{ props: propsTooltip2 }">
					<v-icon
						v-bind="propsTooltip2"
						:size="16"
						color="red-darken-3"
						icon="fa:far fa-trash-can"
						@click="$emit('click:delete')"
					/>
				</template>
			</v-tooltip>
		</template>
		<template v-else>
			<v-btn
				variant="text"
				:ripple="false"
				color="yellow-darken-4"
				class="mr-2"
				@click="$emit('click:edit')"
			>
				<v-icon
					class="mr-1"
					icon="fa:far fa-pen-to-square"
					:size="14"
				/>
				Edit
			</v-btn>
			<v-btn
				variant="text"
				:ripple="false"
				color="red-darken-3"
				@click="$emit('click:delete')"
			>
				<v-icon
					class="mr-1"
					icon="fa:far fa-trash-can"
					:size="14"
				/>
				Remove
			</v-btn>
		</template>
	</v-btn-group>
</template>

<script lang="ts" setup>
interface Props {
	detail?: boolean
	edit?: boolean
	delete?: boolean
	showText?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	detail: false,
	edit: false,
	delete: false,
	showText: false
})

defineEmits<{
	(e: 'click:edit'): void
	(e: 'click:delete'): void
}>()
</script>

<style lang="scss" scoped>
.v-btn-group.button-actions {
	position: relative;
	&.only-icon {
		.v-icon {
			cursor: pointer;
			&:hover {
				opacity: 0.6;
			}
		}
	}
	.v-btn {
		cursor: pointer;
		padding: 0;
		:deep(.v-btn__content) {
			font-size: 0.8125rem;
		}
		&:hover {
			opacity: 0.6;
		}
	}
}
</style>
