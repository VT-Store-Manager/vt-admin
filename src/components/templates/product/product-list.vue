<template>
	<organism-data-table
		:headers="headers"
		:items="items"
		:pagination="pagination"
		:total-item-amount="totalProduct"
		:loading="pending"
		editable
		:update-page-fn="updatePage"
	>
		<template #name="{ item }">
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
		</template>
		<template #category="{ item }">
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
		</template>
		<template #options="{ item }">
			<div class="d-flex">
				<p class="text-16px">
					{{ item.options.length }} loại
					<v-tooltip
						activator="parent"
						:open-delay="300"
					>
						<div class="d-flex">
							<div class="option-name">
								<p
									v-for="option in item.options"
									:key="option.id"
								>
									{{ option.name }}{{ option.range[0] > 0 ? ' *' : '' }}
								</p>
							</div>
							<div class="separate mx-2">
								<p
									v-for="n in item.options.length"
									:key="n"
								>
									-
								</p>
							</div>
							<div class="option-item">
								<p
									v-for="option in item.options"
									:key="option.id"
									class="text-right"
								>
									{{ option.items }} item{{ option.items > 1 ? 's' : '' }}
								</p>
							</div>
						</div>
					</v-tooltip>
				</p>
			</div>
		</template>
		<template #status="{ item }">
			<molecule-status-chip
				:status="item.status"
				class="text-14px font-weight-semibold"
			/>
		</template>
		<template #updatedAt="{ item }">
			<molecule-date-from-now
				:date="item.updatedAt"
				class="text-center text-16px"
			/>
		</template>
	</organism-data-table>
</template>

<script lang="ts" setup>
import { TableHeader } from '~/types'
import { ProductListItemModel } from '~/models'

const productList = useProductList()
const { items, totalProduct, pending, pagination } = storeToRefs(productList)
const { updatePage } = productList
const { collapse } = storeToRefs(useSidebar())

const headers = computed<TableHeader<ProductListItemModel>[]>(() => {
	return [
		{
			title: 'Tên sản phẩm',
			key: 'name',
			sortable: true,
			width: 280,
		},
		{
			title: 'Loại',
			key: 'category',
			sortable: true,
		},
		{
			title: 'Giá',
			key: 'originalPrice',
			sortable: true,
			width: 100,
			calculate: (value: number) =>
				value.toLocaleString().replace(/,/, '.') + ' đ',
		},
		...(collapse.value === 1
			? [
					{
						title: 'Lựa chọn',
						key: 'options',
					},
			  ]
			: []),
		{
			title: 'Trạng thái',
			key: 'status',
			sortable: true,
			width: 100,
		},
		{
			title: 'Cập nhật cuối',
			key: 'updatedAt',
			sortable: true,
			centerHead: true,
		},
	]
})
</script>
