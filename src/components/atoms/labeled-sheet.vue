<template>
	<v-sheet
		class="labeled-sheet bg-white px-6"
		:style="{
			borderRadius: `${sheetRound}px`,
			paddingTop: `${labelHeight}px`,
		}"
	>
		<label
			class="sheet-label font-weight-bold text-center px-3 d-flex align-center"
			:class="[
				`text-${labelFontSize}px`,
				`text-${labelColor}`,
				`bg-${labelBackground}`,
				`knob-${labelKnob}`,
			]"
			:style="{
				lineHeight: `${labelHeight}px`,
				borderTopLeftRadius: `${sheetRound}px`,
				borderBottomRightRadius: `${sheetRound}px`,
				top: `${-labelKnob}px`,
			}"
		>
			<slot name="icon">
				<v-icon
					v-if="icon"
					:icon="icon"
					size="20px"
					class="mr-2"
				/>
			</slot>
			<span> {{ label }}</span>
		</label>
		<slot></slot>
	</v-sheet>
</template>

<script setup lang="ts">
interface Props {
	label: string
	labelBackground?: string
	labelColor?: string
	labelKnob?: number
	labelFontSize?: number
	labelHeight?: number
	sheetRound?: number
	icon?: string
}

const props = withDefaults(defineProps<Props>(), {
	labelBackground: 'grey',
	labelColor: 'white',
	labelKnob: 8,
	labelFontSize: 16,
	labelHeight: 32,
	sheetRound: 12,
})
</script>

<style lang="scss" scoped>
.labeled-sheet {
	position: relative;
	box-shadow: 0 0 10px #0003;
}
.sheet-label {
	position: absolute;
	left: 0;
	box-shadow: 0 0 10px #0003;
	@for $i from 1 through 10 {
		&.knob-#{$i}::after {
			$border-y: 0.5px * $i;
			$border-x: 0.25px * $i;
			content: '';
			display: block;
			position: absolute;
			border-width: $border-y $border-x $border-y $border-x;
			border-style: solid;
			border-color: transparent transparent #888 #888;
			top: 0;
			left: 100%;
		}
	}
}
</style>
