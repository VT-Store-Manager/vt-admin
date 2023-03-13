<template>
	<template-page-container page-name="Product category">
		<template #subtitle>
			<p>
				{{ productCategoryData ? productCategoryData.length : 0 }} categories
			</p>
		</template>
		<template #title-right>
			<v-progress-circular
				v-show="loading"
				:class="{ done: !loading }"
				class="mr-4"
				indeterminate
				color="primary"
				:size="22"
				:width="3"
			/>
			<button-refresh
				class="mr-3"
				title="Refresh data"
				@click="refreshData"
			/>
			<button-create @click="showCreateModal = true">
				New category
			</button-create>
			<product-category-create-modal
				:show="showCreateModal"
				@close-modal="showCreateModal = false"
				@created="refreshData"
			/>
		</template>
		<base-table v-show="!productCategory.loading || !firstLoad">
			<template #head>
				<base-table-th
					v-for="fieldName in fieldNameList ?? []"
					:key="fieldName"
					:title="variableCaseToText(fieldName.toString())"
					:field-name="fieldName.toString()"
					:sorting-field-name="sortingFieldName?.toString()"
					@sort="onDataSort"
				/>
				<base-table-th
					title="Actions"
					:sortable="false"
					text-align="right"
					:show-sort-icon="false"
				/>
			</template>
			<template #data>
				<tr
					v-for="(row, index) in productCategoryData || []"
					:key="row.id"
					:class="{ 'bg-screen': index % 2 == 1 }"
				>
					<td>
						<v-hover>
							<template #default="{ isHovering: hoveringId, props: idProps }">
								<nuxt-link
									:to="`/product-category/${row.id}`"
									v-bind="idProps"
									:class="{ 'text-primary-darken': hoveringId }"
								>
									{{ row.id.slice(-6) }}
									<v-tooltip
										activator="parent"
										location="start"
										open-delay="500"
									>
										{{ row.id }}
									</v-tooltip>
								</nuxt-link>
							</template>
						</v-hover>
					</td>
					<td class="d-flex align-center">
						<v-hover>
							<template
								#default="{ isHovering: hoveringName, props: nameProps }"
							>
								<nuxt-link
									:to="'/product-category/' + row.id"
									class="d-flex align-center"
									v-bind="nameProps"
								>
									<nuxt-img
										class="d-block mr-2 rounded small-img-shadow"
										:src="
											row.image
												? $config.imgResourceUrl + row.image
												: faker.image.food(40, 40, true)
										"
										:width="40"
										:class="{ 'hover-blur': hoveringName }"
									/>
									<span
										class="ellipsis-2"
										:class="{ 'text-primary-darken': hoveringName }"
									>
										{{ row.name }}
									</span>
								</nuxt-link>
							</template>
						</v-hover>
					</td>
					<td>{{ row.amountOfProduct }}</td>
					<td>{{ row.totalSold }}</td>
					<td>{{ row.soldOfWeek }}</td>
					<td>
						<v-chip
							size="small"
							variant="elevated"
							:color="
								row.status === Status.ACTIVE
									? 'green-lighten-1'
									: row.status === Status.DISABLED
									? 'purple-lighten-3'
									: 'red-lighten-2'
							"
						>
							{{ row.status }}
						</v-chip>
					</td>
					<td>
						<button-action-group
							edit
							delete
							show-text
							@click:edit="onEditItem(row.id)"
							@click:delete="rowCodeConfirmed = row.id"
						/>
					</td>
					<base-table-confirm-delete
						:show="rowCodeConfirmed === row.id"
						@click:cancel="rowCodeConfirmed = null"
						@click:confirm-delete="onDeleteItem(row.id)"
					/>
				</tr>
			</template>
			<template #alternative-row>
				<td
					v-if="productCategory.error || !productCategoryData"
					colspan="7"
				>
					Get product category data error: {{ productCategory.error }}
				</td>
				<td
					v-else-if="productCategoryData?.length === 0"
					colspan="7"
				>
					No data
				</td>
			</template>
		</base-table>
	</template-page-container>
</template>

<script lang="ts" setup>
import { faker } from '@faker-js/faker'
import { ProductCategoryModel } from '~/models/product/product-category'
import { Status } from '~/constants'

useSeoMeta({
	title: 'Product categories'
})

const productCategory = useProductCategory()
const disableProductCategory = useDisableProductCategory()
const productCategoryData = ref<ProductCategoryModel[]>([])

const fieldNameList: Array<keyof ProductCategoryModel> = [
	'id',
	'name',
	'amountOfProduct',
	'totalSold',
	'soldOfWeek',
	'status'
]
const sortingFieldName = ref<undefined | keyof ProductCategoryModel>(undefined)
const showCreateModal = ref(false)
const firstLoad = ref(true)
const rowCodeConfirmed = ref<null | string>(null)
const router = useRouter()

const loading = computed(() => {
	return productCategory.loading || disableProductCategory.loading
})

const refreshData = async () => {
	sortingFieldName.value = undefined
	await productCategory.fetch()
	productCategoryData.value =
		productCategory.response?.data &&
		Array.isArray(productCategory.response.data)
			? [...productCategory.response.data]
			: []
}

const onDataSort = (fieldName: string, ascOrder: boolean) => {
	sortingFieldName.value = fieldName as keyof ProductCategoryModel
	productCategoryData.value.sort(
		dataCompareFunc<ProductCategoryModel>(sortingFieldName.value, ascOrder)
	)
}

refreshData()

watch(
	() => productCategory.loading,
	() => {
		if (!productCategory.loading && firstLoad.value) firstLoad.value = false
	}
)

const onEditItem = (id: string) => {
	router.push({ path: `/product-category/${id}/edit` })
}

const onDeleteItem = async (id: string) => {
	rowCodeConfirmed.value = null
	console.log('Delete:', id)
	await disableProductCategory.fetch({ params: { id } })
	refreshData()
}
</script>
