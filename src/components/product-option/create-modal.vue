<template>
	<v-dialog
		v-model="show"
		width="900"
		@update:model-value="$emit('closeModal')"
	>
		<v-form v-if="!isSubOption">
			<v-card class="rounded-16">
				<v-card-title class="font-weight-bold py-4 px-6">
					Add new option
				</v-card-title>
				<v-card-item class="mx-6 custom-scrollbar">
					<v-row>
						<v-col>
							<v-checkbox
								v-model="isSubOption"
								label="Sub-option"
							/>
						</v-col>
						<v-col cols="9">
							<v-text-field
								v-model="newOption.name"
								label="Name"
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="4">
							<v-text-field
								v-model="newOption.range[0]"
								type="number"
								label="Min selected amount"
							/>
						</v-col>
						<v-col cols="4">
							<v-text-field
								v-model="newOption.range[1]"
								type="number"
								label="Max selected amount"
							/>
						</v-col>
					</v-row>
					<product-option-item
						v-for="(item, index) in newOption.items"
						:key="item.key"
						:item="item"
						@update-name="name => (item.name = name)"
						@update-cost="cost => (item.cost = cost)"
						@delete-item="newOption.items.splice(index, 1)"
					/>
					<v-row>
						<v-col class="pt-0">
							<v-btn
								:prepend-icon="mdiPlus"
								variant="text"
								@click="
									newOption.items.push({
										name: '',
										cost: 0,
										key: temporaryUniqueKey()
									})
								"
							>
								Add
							</v-btn>
						</v-col>
					</v-row>
				</v-card-item>
				<v-card-actions
					class="justify-space-between font-weight-bold py-4 px-6"
				>
					<v-btn
						color="red-darken-1"
						@click="clearData(isSubOption ? 'subOption' : 'option')"
					>
						Clear
					</v-btn>
					<div>
						<v-btn
							color="gray"
							@click="$emit('closeModal')"
						>
							Cancel
						</v-btn>
						<v-btn
							color="green"
							variant="tonal"
							@click="saveNewOption"
						>
							Create
						</v-btn>
					</div>
				</v-card-actions>
			</v-card>
		</v-form>

		<v-form v-else>
			<v-card class="rounded-16">
				<v-card-title class="font-weight-bold py-4 px-6">
					Add new option
				</v-card-title>
				<v-card-item class="mx-6 custom-scrollbar">
					<v-row>
						<v-col>
							<v-checkbox
								v-model="isSubOption"
								label="Sub-option"
							/>
						</v-col>
						<v-col cols="9">
							<v-select
								v-model="newSubOption.parent"
								label="Select parent"
								:items="productOptionList.getAllNameForSelect"
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="4">
							<v-text-field
								v-model="newSubOption.range[0]"
								type="number"
								label="Min selected amount"
							/>
						</v-col>
						<v-col cols="4">
							<v-text-field
								v-model="newSubOption.range[1]"
								type="number"
								label="Max selected amount"
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-select
							v-model="productOptionList.selectedItem"
							clearable
							chips
							closable-chips
							label="Select option items"
							:items="productOptionList.getItemsOfMarkedForSelect"
							multiple
						/>
					</v-row>
					<product-option-item
						v-for="(item, index) in newSubOption.items"
						:key="item.key"
						:item="item"
						disable-name
						@update-cost="cost => (item.cost = cost)"
						@delete-item="deleteSubOptionItem(index)"
					/>
				</v-card-item>
				<v-card-actions
					class="justify-space-between font-weight-bold py-4 px-6"
				>
					<v-btn
						color="red-darken-1"
						@click="clearData(isSubOption ? 'subOption' : 'option')"
					>
						Clear
					</v-btn>
					<div>
						<v-btn
							color="gray"
							@click="$emit('closeModal')"
						>
							Cancel
						</v-btn>
						<v-btn
							color="green"
							variant="tonal"
							@click="saveNewOption"
						>
							Create
						</v-btn>
					</div>
				</v-card-actions>
			</v-card>
		</v-form>
	</v-dialog>
</template>

<script lang="ts" setup>
import { mdiPlus } from '@mdi/js'
import {
	CreateNewProductOptionModel,
	CreateProductSubOptionModel
} from '~/models/product/create-product-option'

interface Props {
	show?: boolean
}

const props = defineProps<Props>()
const emits = defineEmits<{
	(e: 'closeModal'): void
}>()
const productOptionList = useProductOptionList()

const show = ref(props.show)
watch(
	() => props.show,
	() => {
		show.value = props.show
	}
)

const isSubOption = ref(false)
const newOption = reactive<CreateNewProductOptionModel>({
	name: '',
	range: [0, 1],
	items: [{ name: '', cost: 0, key: temporaryUniqueKey() }]
})
const newSubOption = reactive<CreateProductSubOptionModel>({
	parent: undefined,
	range: [0, 1],
	items: []
})

const clearData = (arg: 'subOption' | 'option' | 'all' = 'all') => {
	if (arg === 'subOption' || arg === 'all') {
		Object.assign(newSubOption, {
			parent: undefined,
			maxSelect: 1,
			required: false,
			items: []
		})
		productOptionList.clearSelected()
	}
	if (arg === 'option' || arg === 'all') {
		Object.assign(newOption, {
			name: '',
			maxSelect: 1,
			required: false,
			items: [{ name: '', cost: 0, key: temporaryUniqueKey() }]
		})
	}
}

const saveNewOption = () => {
	if (isSubOption.value) {
		console.log(newSubOption)
	} else {
		console.log(newOption)
	}
	emits('closeModal')
	clearData('all')
}

watch(
	() => newSubOption.parent,
	() => {
		if (!newSubOption.parent) return
		productOptionList.markId = newSubOption.parent
		productOptionList.selectedItem = []
	}
)

watch(
	() => productOptionList.selectedItem,
	() => {
		newSubOption.items = productOptionList.getSelectedItem
	}
)

const deleteSubOptionItem = (index: number) => {
	productOptionList.selectedItem.splice(index, 1)
	newSubOption.items.splice(index, 1)
}
</script>
