<template>
	<v-scroll-x-reverse-transition>
		<v-alert
			:model-value="show"
			border="start"
			position="absolute"
			close-label="Close Alert"
			:type="data.type"
			rounded="lg"
			variant="tonal"
			class="elevation-3"
			closable
			close-icon="fa:fas fa-xmark"
			:style="{
				background: 'white',
				top: '16px',
				right: '24px',
				zIndex: 99999,
			}"
			@click:close="show = false"
		>
			{{ data.text }}
			<template
				v-if="data.duration"
				#prepend
			>
				<div
					class="relative cursor-pointer"
					@click="show = false"
				>
					<v-icon
						class="transition-all"
						:style="{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
						}"
					/>
					<v-progress-circular
						:model-value="countProgress"
						:color="data.type"
						:width="2"
					/>
				</div>
			</template>
			<!-- <template #close>
				<v-hover>
					<template #default="{ isHovering, props }">
						<div
							v-bind="props"
							class="relative cursor-pointer"
							@click="show = false"
						>
							<v-icon
								icon="fa:fas fa-xmark"
								:size="isHovering ? 'small' : 'x-small'"
								class="transition-all"
								:style="{
									position: 'absolute',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
								}"
							/>
							<v-progress-circular
								:model-value="countProgress"
								color="grey-lighten-3"
								class="bg-transparent"
								:width="3"
							/>
						</div>
					</template>
				</v-hover>
			</template> -->
		</v-alert>
	</v-scroll-x-reverse-transition>
</template>

<script setup lang="ts">
const { startTimeout } = useAlert()
const { data, show } = storeToRefs(useAlert())
const now = useNow()
const pinTime = ref<Date>()

watch(show, value => {
	if (value) {
		pinTime.value = new Date()
		startTimeout()
	} else {
		pinTime.value = undefined
	}
})

const countProgress = computed(() => {
	if (!pinTime.value) return 0
	return Math.round(
		((now.value.getTime() - pinTime.value.getTime()) / data.value.duration!) *
			100
	)
})
</script>

<style style="scss" scoped>
:deep(.v-alert__content) {
	font-weight: 500;
}
</style>
