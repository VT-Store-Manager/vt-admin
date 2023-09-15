<template>
	<span
		v-if="optionItemKeys.length"
		class="text-13px d-inline-block rounded-pill bg-grey-lighten-2 px-2 ml-3"
	>
		+{{ optionItemKeys.length }} tuỳ chọn
		<v-tooltip
			activator="parent"
			location="right center"
		>
			<div class="d-flex justify-space-between">
				<div>
					<p
						v-for="(item, index) in optionItems"
						:key="optionItemKeys[index]"
					>
						{{ item.name }}:
					</p>
				</div>
				<div class="ml-2 d-flex flex-column align-end">
					<p
						v-for="(item, index) in optionItems"
						:key="optionItemKeys[index]"
					>
						{{ item.itemName }} -
						{{ item.cost.toLocaleString().replace(/,/g, '.') }} đ
					</p>
				</div>
			</div>
		</v-tooltip>
	</span>
</template>

<script setup lang="ts">
interface Props {
	optionItemKeys: string[]
}

const props = defineProps<Props>()
const { getOptionItemInfo } = useProductOptionList()

const optionItems = computed(() => {
	return props.optionItemKeys.map(key => getOptionItemInfo(key))
})
</script>

<style scoped></style>
