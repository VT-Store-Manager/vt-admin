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
				class="mr-3"
				indeterminate
				color="primary"
				:size="24"
				:width="5"
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
			/>
		</template>
		<base-table v-show="!loading || !firstLoad">
			<template #head>
				<base-table-th
					v-for="fieldName in fieldNameList ?? []"
					:key="fieldName"
					:title="variableCaseToText(fieldName)"
					:field-name="fieldName"
					:sorting-field-name="sortingFieldName"
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
									{{ row.id }}
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
										class="d-block mr-2 rounded"
										:src="row.image || faker.image.food(40, 40, true)"
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
								row.status === 'active'
									? 'green-lighten-1'
									: row.status === 'inactive'
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
					v-if="error || !productCategoryData"
					colspan="7"
				>
					Get product category data error
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
import { ProductCategoryModel } from '~/types/models/product-category'

useSeoMeta({
	title: 'Product categories'
})

const {
	response: productCategoryData,
	loading,
	error,
	fetchGet
} = useProductCategoryList()

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

const refreshData = async () => {
	sortingFieldName.value = undefined
	const controller = getAbortController()
	await fetchGet({ signal: controller.signal })
	clearTimeout(controller.timeoutId)
}

const onDataSort = (fieldName: string, ascOrder: boolean) => {
	sortingFieldName.value = fieldName as keyof ProductCategoryModel
	productCategoryData.value?.sort(
		dataCompareFunc<ProductCategoryModel>(sortingFieldName.value, ascOrder)
	)
}

refreshData()

watch(loading, () => {
	if (!loading.value && firstLoad.value) firstLoad.value = false
})

const onEditItem = (id: string) => {
	router.push({ path: `/product-category/${id}/edit` })
}
const onDeleteItem = (id: string) => {
	rowCodeConfirmed.value = null
	console.log('Delete:', id)
}
</script>
