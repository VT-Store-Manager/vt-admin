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
					<v-row class="pt-1">
						<v-col>
							<v-checkbox
								v-model="isSubOption"
								label="Sub-option"
							/>
						</v-col>
						<v-col cols="9">
							<base-form-input
								v-model="newOption.name"
								label="Name"
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="3">
							<v-label
								text="Selectable range:"
								class="py-4 px-2"
							/>
						</v-col>
						<v-col cols="2">
							<base-form-input
								v-model="newOption.range[0]"
								type="number"
								label="Min"
								a
							/>
						</v-col>
						<v-col cols="2">
							<base-form-input
								v-model="newOption.range[1]"
								type="number"
								label="Max"
								a
							/>
						</v-col>
					</v-row>
					<product-option-item
						v-for="(item, index) in newOption.newItems"
						:key="item.key"
						:item="item"
						@update-name="(name: string) => (item.name = name)"
						@update-cost="(cost: number) => (item.cost = cost)"
						@delete-item="newOption.newItems.splice(index, 1)"
					/>
					<v-row>
						<v-col class="pt-0">
							<v-btn
								:prepend-icon="mdiPlus"
								variant="text"
								@click="
									newOption.newItems.push({
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
					<v-row class="pt-1">
						<v-col>
							<v-checkbox
								v-model="isSubOption"
								label="Sub-option"
							/>
						</v-col>
						<v-col cols="9">
							<base-form-select
								v-model="newSubOption.parent"
								label="Select parent"
								:items="productOption.getAllNameForSelect"
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="3">
							<v-label
								text="Selectable range:"
								class="py-4 px-2"
							/>
						</v-col>
						<v-col cols="2">
							<base-form-input
								v-model="newSubOption.range[0]"
								type="number"
								label="Min"
								a
							/>
						</v-col>
						<v-col cols="2">
							<base-form-input
								v-model="newSubOption.range[1]"
								type="number"
								label="Max"
								a
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<base-form-select
								v-model="productOption.selectedItem"
								clearable
								chips
								closable-chips
								label="Select option items"
								:items="productOption.getItemsOfMarkedForSelect"
								multiple
							/>
						</v-col>
					</v-row>
					<product-option-item
						v-for="(item, index) in newSubOption.childItems"
						:key="item.key"
						:item="item"
						:index="index"
						disable-name
						@update-cost="(cost: number) => (item.cost = cost)"
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
	(e: 'created'): void
}>()
const productOption = useProductOption()
const createProductOption = useCreateProductOption()

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
	newItems: [{ name: '', cost: 0, key: temporaryUniqueKey() }]
})
const newSubOption = reactive<CreateProductSubOptionModel>({
	parent: undefined,
	range: [0, 1],
	childItems: []
})

const clearData = (arg: 'subOption' | 'option' | 'all' = 'all') => {
	if (arg === 'option' || arg === 'all') {
		newOption.name = ''
		newOption.range = [0, 1]
		newOption.newItems = [{ name: '', cost: 0, key: temporaryUniqueKey() }]
	}
	if (arg === 'subOption' || arg === 'all') {
		newSubOption.parent = undefined
		newSubOption.range = [0, 1]
		newSubOption.childItems = []

		productOption.clearSelected()
	}
}

const saveNewOption = async () => {
	const body = isSubOption.value
		? {
				parent: newSubOption.parent!,
				range: newSubOption.range.map(v => +v),
				childItems: newSubOption.childItems.map(item => {
					item.cost = +item.cost
					return item
				})
		  }
		: {
				name: newOption.name,
				range: newOption.range.map(v => +v),
				newItems: newOption.newItems.map(item => {
					item.cost = +item.cost
					return item
				})
		  }
	await createProductOption.fetch({ body })
	emits('created')
	emits('closeModal')
	clearData('all')
}

watch(
	() => newSubOption.parent,
	() => {
		if (!newSubOption.parent) return
		productOption.markId = newSubOption.parent
		productOption.selectedItem = []
	}
)

watch(
	() => productOption.selectedItem,
	() => {
		newSubOption.childItems = productOption.getSelectedItem
	}
)

const deleteSubOptionItem = (index: number) => {
	productOption.selectedItem.splice(index, 1)
	newSubOption.childItems.splice(index, 1)
}
</script>
