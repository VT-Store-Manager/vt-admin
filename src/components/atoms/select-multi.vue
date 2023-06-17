<template>
	<v-hover>
		<template #default="{ isHovering, props: hoverProps }">
			<v-select
				v-bind="{ ...hoverProps, ...$attrs }"
				v-model="modelValue"
				variant="outlined"
				color="primary"
				:items="items"
				:bg-color="isEmpty(modelValue) || isHovering ? bgColor : 'white'"
				:base-color="isHovering ? 'primary' : 'black'"
				class="select transition-background-color-all"
				rounded="12"
				multiple
				@update:focused="value => (bgColor = value ? 'white' : 'input')"
			>
				<template
					v-if="$slots['prepend-item'] || selectAll"
					#prepend-item
				>
					<slot
						v-if="$slots['prepend-item']"
						name="prepend-item"
					></slot>
					<template v-else>
						<v-list-item
							title="Select All"
							@click="toggleSelectAll"
						>
							<template #prepend>
								<v-checkbox-btn
									:model-value="isSelectedSome"
									:indeterminate="isSelectedSome && !isSelectedAll"
								/>
							</template>
						</v-list-item>

						<v-divider class="mt-2" />
					</template>
				</template>
			</v-select>
		</template>
	</v-hover>
</template>

<script lang="ts" setup>
import isEmpty from 'lodash/isEmpty'

interface Props {
	selectAll?: boolean
	items?: (string | number)[]
}

const props = withDefaults(defineProps<Props>(), {
	selectAll: false,
	items: [] as any,
})
defineOptions({
	inheritAttrs: false,
})

const bgColor = ref('input')
const modelValue = defineModel<Props['items']>({ default: [], local: true })

const isSelectedAll = computed(() => {
	return (
		modelValue &&
		modelValue.value &&
		modelValue.value.length === props.items?.length
	)
})
const isSelectedSome = computed(() => {
	return modelValue && modelValue.value && modelValue.value.length > 0
})

const toggleSelectAll = () => {
	if (isSelectedAll.value) {
		modelValue.value = []
	} else {
		modelValue.value = props.items
	}
}
</script>

<style lang="scss" scoped>
*,
:deep(*) {
	transition: all 0.3s;
	.v-checkbox-btn {
		transition: none;
		*,
		:deep(*) {
			transition: none;
		}
	}
}
:deep(.v-field__outline) {
	.v-field__outline__start {
		border-radius: $common-round 0 0 $common-round;
	}
	.v-field__outline__end {
		border-radius: 0 $common-round $common-round 0;
	}
}
</style>
