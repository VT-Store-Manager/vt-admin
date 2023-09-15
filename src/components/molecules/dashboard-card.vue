<template>
	<v-hover>
		<template #default="{ isHovering: cardHovering, props: cardProps }">
			<v-card
				v-bind="cardProps"
				rounded="12"
				class="elevation-2 h-100"
			>
				<v-card-title
					v-if="title"
					class="pr-3"
				>
					<div class="d-flex justify-space-between align-center">
						<p class="text-15px font-weight-bold">
							{{ title }}
						</p>
						<slot name="title-right"></slot>
						<v-btn
							v-if="optionButton"
							density="comfortable"
							class="rounded-circle pa-0"
							width="24"
							height="24"
							variant="plain"
							:style="{ minWidth: 'unset' }"
							@click="$emit('optionClick')"
						>
							<v-hover>
								<template #default="{ isHovering, props }">
									<v-icon
										v-bind="props"
										:icon="mdiCog"
										:size="18"
										:color="
											cardHovering
												? isHovering
													? 'grey-darken-2'
													: 'grey'
												: 'grey-lighten-3'
										"
										class="transition-all"
									/>
								</template>
							</v-hover>
						</v-btn>
					</div>
				</v-card-title>
				<v-card-item class="px-2 pb-4">
					<div class="bg-gray">
						<slot></slot>
					</div>
				</v-card-item>
			</v-card>
		</template>
	</v-hover>
</template>

<script lang="ts" setup>
import { mdiCog } from '@mdi/js'
interface Props {
	title?: string
	optionButton?: boolean
}

defineProps<Props>()
defineSlots<{
	'title-right'?: (props: any) => any
	default: (props: any) => any
}>()
defineEmits(['optionClick'])
</script>

<style lang="scss" scoped></style>
