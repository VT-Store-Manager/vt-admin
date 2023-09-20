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
			max-width="400"
			:style="{
				background: 'white',
				top: '16px',
				right: '24px',
				zIndex: 99999,
			}"
			@click:close="show = false"
		>
			<p>
				{{ data.text }}
			</p>
			<p
				v-if="data.description"
				class="text-12px"
			>
				{{ data.description }}
			</p>
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
