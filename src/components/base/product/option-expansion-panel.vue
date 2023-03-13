<template>
	<v-expansion-panels variant="accordion">
		<v-expansion-panel
			v-for="option in temp"
			:key="option.id"
			color="primary"
		>
			<v-expansion-panel-title>
				<p>{{ option.name }}</p>
			</v-expansion-panel-title>
			<v-expansion-panel-text>
				<v-row
					v-for="item in option.items"
					:key="item.key"
				>
					<v-col cols="8">
						<base-form-input
							:model-value="item.name"
							label="Item name"
							disabled
							hide-details="auto"
						/>
					</v-col>
					<v-col cols="4">
						<base-form-input
							:model-value="item.cost"
							label="Item cost"
							disabled
							hide-details="auto"
						/>
					</v-col>
				</v-row>
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script lang="ts" setup>
interface Props {
	optionIds?: Array<string>
}

const props = withDefaults(defineProps<Props>(), {
	optionIds: () => []
})

const productOptionList = useProductOptionList()
const temp = computed(() => {
	return productOption.getOptionsById(props.optionIds)
})
</script>
