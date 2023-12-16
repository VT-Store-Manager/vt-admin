<template>
	<molecule-dialog
		v-model="show"
		:card-attrs="{}"
		:sheet-attrs="{
			width: '95%',
			maxWidth: '800px',
		}"
		:title="title"
	>
		<template #headActions>
			<atom-btn
				size="small"
				class="mr-4 font-weight-bold"
				color="yellow-darken-4"
				variant="tonal"
				elevation="1"
				@click="modelValue = initItems"
			>
				Reset
			</atom-btn>
		</template>
		<v-row>
			<v-col cols="6">
				<p
					v-if="leftListTitle"
					class="font-weight-bold"
				>
					{{ leftListTitle }}
				</p>
				<draggable
					v-model="modelValue"
					:group="dragGroup"
					:component-data="{
						class: 'rounded-12 h-100',
					}"
				>
					<template #item="{ element }">
						<div class="bg-grey-lighten-4 my-2 px-2 rounded-lg">
							<slot name="item-left">
								<slot
									name="item"
									:item="itemMap.get(element) ?? element"
								>
									<p>{{ element }}</p>
								</slot>
							</slot>
						</div>
					</template>
				</draggable>
			</v-col>
			<v-col cols="6">
				<p
					v-if="rightListTitle"
					class="font-weight-bold"
				>
					{{ rightListTitle }}
				</p>
				<draggable
					v-model="unpickedList"
					:group="dragGroup"
					:component-data="{
						class: 'rounded-12 h-100',
					}"
				>
					<template #item="{ element }">
						<div class="bg-grey-lighten-4 my-2 px-2 rounded-lg">
							<slot name="item-right">
								<slot
									name="item"
									:item="itemMap.get(element) ?? element"
								>
									<p>{{ element }}</p>
								</slot>
							</slot>
						</div>
					</template>
				</draggable>
			</v-col>
		</v-row>
	</molecule-dialog>
</template>

<script setup lang="ts" generic="T, K = T">
interface Props {
	title: string
	leftListTitle?: string
	rightListTitle?: string
	items: K[]
	initItems: T[]
	dragGroupName?: string
	itemKey?: string
}

const props = defineProps<Props>()
const modelValue = defineModel<T[]>({ default: () => [], local: true })
const show = defineModel('show', { default: false, local: true })
defineSlots<{
	item?: (item: any) => any
	'item-right'?: (props: any) => any
	'item-left'?: (props: any) => any
}>()

const unpickedList = computed<T[]>(() =>
	props.items
		.map(item => {
			const itemValue = (item as any)?.[props.itemKey ?? ''] ?? item
			if (modelValue.value.includes(itemValue)) return null
			return itemValue
		})
		.filter(v => v)
)

const itemMap = computed(() => {
	return new Map(
		props.items.map(item => {
			const itemKey = (item as any)?.[props.itemKey ?? ''] ?? item
			return [itemKey, item]
		})
	)
})

const dragGroup = computed(() => {
	return props.dragGroupName ?? temporaryUniqueKey()
})
</script>
