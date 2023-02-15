<template>
	<template-page-container page-name="Product list">
		<template #subtitle>
			<p>{{ productData ? productData.length : 0 }} products</p>
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
			<button-create @click="$router.push('/product/create')">
				New product
			</button-create>
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
					v-for="(row, index) in productData || []"
					:key="row.id"
					:class="{ 'bg-screen': index % 2 == 1 }"
				>
					<td>
						<v-hover>
							<template #default="{ isHovering: hoveringId, props: idProps }">
								<nuxt-link
									:to="`/product/${row.id}`"
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
									:to="'/product/' + row.id"
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
					<td>{{ row.originalPrice }}</td>
					<td>{{ row.saleOfMonth }}</td>
					<td>{{ row.category }}</td>
					<td>{{ row.updatedAt }}</td>
					<td>
						<button-action-group
							edit
							delete
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
					v-if="error || !productData"
					colspan="7"
				>
					Get product data error
				</td>
				<td
					v-else-if="productData?.length === 0"
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
import { ProductModel } from '~/types/models/product'

useSeoMeta({
	title: 'Product list'
})

const { response: productData, loading, error, fetchGet } = useProductList()

const fieldNameList: Array<keyof ProductModel> = [
	'id',
	'name',
	'originalPrice',
	'saleOfMonth',
	'category',
	'updatedAt'
]
const sortingFieldName = ref<undefined | keyof ProductModel>(undefined)
const firstLoad = ref(true)
const rowCodeConfirmed = ref<null | string>(null)
const router = useRouter()

const refreshData = async () => {
	sortingFieldName.value = undefined
	const controller = getAbortController()
	await fetchGet({ signal: controller.signal })
	clearTimeout(controller.timeoutId)
}

refreshData()

const onDataSort = (fieldName: string, ascOrder: boolean) => {
	sortingFieldName.value = fieldName as keyof ProductModel
	productData.value?.sort(
		dataCompareFunc<ProductModel>(sortingFieldName.value, ascOrder)
	)
}

watch(loading, () => {
	if (!loading.value && firstLoad.value) firstLoad.value = false
})

const onEditItem = (id: string) => {
	router.push({ path: `/product/${id}/edit` })
}
const onDeleteItem = (id: string) => {
	rowCodeConfirmed.value = null
	console.log('Delete:', id)
}
</script>
