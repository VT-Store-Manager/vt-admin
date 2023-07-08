<template>
	<organism-data-table
		:headers="headers"
		:items="hideChild ? parentOptions : items"
		:pagination="pagination"
		:total-item-amount="totalCount"
		:loading="pending"
		editable
		:update-page-fn="updatePage"
	>
		<template #name="{ item }">
			<div class="d-flex align-center">
				<p class="text-16px">{{ item.name }}</p>
				<v-chip
					v-if="item.parent"
					density="comfortable"
					class="ml-2"
					size="small"
				>
					child
				</v-chip>
			</div>
		</template>
		<template #items="{ item: option }">
			<div class="d-flex">
				<p class="text-16px">
					{{ option.items.length }} items
					<v-tooltip activator="parent">
						<div class="d-flex">
							<div class="item-name">
								<p
									v-for="item in option.items"
									:key="item.key"
								>
									{{ item.name }}
								</p>
							</div>
							<div class="item-cost ml-4">
								<p
									v-for="item in option.items"
									:key="item.key"
									class="text-right"
								>
									{{ item.cost }} đ
								</p>
							</div>
						</div>
					</v-tooltip>
				</p>
			</div>
		</template>
		<!-- <template #name="{ item }">
			<v-hover>
				<template #default="{ isHovering: hoveringName, props: nameProps }">
					<atom-link
						:to="'/product/' + item.id"
						class="d-flex align-center py-2"
						v-bind="nameProps"
					>
						<atom-img
							class="mr-4 rounded small-img-shadow"
							:src="item.images[0]"
							:alt-src="item.images.slice(1)"
							height="40"
							max-width="40"
							aspect-ratio="1/1"
							:class="{ 'hover-blur': hoveringName }"
							server-img
							server-alt-img
							lazy-src="/img/default/product.png"
						/>
						<span
							class="ellipsis-2 text-16px font-weight-medium transition-color"
							:class="{ 'text-primary': hoveringName }"
						>
							{{ item.name }}
						</span>
					</atom-link>
				</template>
			</v-hover>
		</template> -->
		<!-- <template #category="{ item }">
			<v-hover>
				<template
					#default="{ isHovering: hoveringCategory, props: categoryProps }"
				>
					<atom-link
						:to="'/product-category/' + item.category.id"
						v-bind="categoryProps"
						class="ellipsis-2 text-16px font-weight-medium transition-color d-block py-2"
						:class="{ 'text-primary': hoveringCategory }"
					>
						{{ item.category.name }}
					</atom-link>
				</template>
			</v-hover>
		</template> -->
		<template #status="{ item }">
			<molecule-status-chip
				:status="item.status"
				class="text-14px font-weight-semibold"
			/>
		</template>
		<!-- <template #updatedAt="{ item }">
			<molecule-date-from-now
				:date="item.updatedAt"
				class="text-center text-16px"
			/>
		</template> -->
	</organism-data-table>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { TableHeader } from '~/types'
import { ProductOptionListItemModel } from '~/models'
import { useProductOptionList } from '~/composables/apis/use-product-option-list'

interface Props {
	hideChild: boolean
}

defineProps<Props>()
const productOptionList = useProductOptionList()
const { items, totalCount, pending, pagination, parentOptions } =
	storeToRefs(productOptionList)
const { updatePage } = productOptionList

const headers: TableHeader<ProductOptionListItemModel>[] = [
	{
		title: 'Name',
		key: 'name',
		sortable: true,
	},
	{
		title: 'Items',
		key: 'items',
	},
	{
		title: 'Applying',
		key: 'applying',
		calculate: value => `${value} product${value > 1 ? 's' : ''}`,
	},
	{
		title: 'Status',
		key: 'status',
		sortable: true,
	},
]
</script>
