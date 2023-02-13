<template>
	<template-page-container page-name="Product category">
		<template #subtitle>
			<p>
				{{ productCategoryData ? productCategoryData.length : 0 }} categories
				{{ error }}
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
					v-for="fieldName in fieldNameList"
					:key="fieldName"
					:title="variableCaseToText(fieldName)"
					:field-name="fieldName"
					:sorting-field-name="sortingFieldName"
					@sort="onSort"
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
					v-for="row in productCategoryData"
					:key="row.code"
				>
					<td>
						<nuxt-link :to="'/product-category/' + row.code">
							{{ row.code }}
						</nuxt-link>
					</td>
					<td class="d-flex align-center">
						<nuxt-link
							:to="'/product/category/' + row.code"
							class="d-flex align-center"
						>
							<nuxt-img
								class="d-block mr-2 rounded"
								:src="row.image || faker.image.food(40, 40, true)"
								:width="40"
							/>
							<span class="ellipsis-2">{{ row.name }}</span>
						</nuxt-link>
					</td>
					<td>{{ row.amount }}</td>
					<td>{{ row.sold }}</td>
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
							@click:edit="onEditItem(row.code)"
							@click:delete="rowCodeConfirmed = row.code"
						/>
					</td>
					<base-table-confirm-delete
						:show="rowCodeConfirmed === row.code"
						@click:cancel="rowCodeConfirmed = null"
						@click:confirm-delete="onDeleteItem(row.code)"
					/>
				</tr>
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
	'code',
	'name',
	'amount',
	'sold',
	'status'
]
const sortingFieldName = ref<undefined | keyof ProductCategoryModel>(undefined)
const showCreateModal = ref(false)
const firstLoad = ref(true)
const rowCodeConfirmed = ref<null | string>(null)
const router = useRouter()

const refreshData = () => {
	sortingFieldName.value = undefined
	fetchGet()
}

const onSort = (fieldName: keyof ProductCategoryModel, ascOrder: boolean) => {
	sortingFieldName.value = fieldName
	productCategoryData.value?.sort(
		(a: ProductCategoryModel, b: ProductCategoryModel) => {
			const val1 = a[fieldName]
			const val2 = b[fieldName]
			if (!val1 && !val2) return 0
			if (!val1) return ascOrder ? -1 : 1
			if (!val2) return ascOrder ? 1 : -1
			if (val1 < val2) return ascOrder ? -1 : 1
			if (val1 > val2) return ascOrder ? 1 : -1
			return 0
		}
	)
}

refreshData()

watch(loading, () => {
	if (!loading.value && firstLoad.value) firstLoad.value = false
})

const onEditItem = (code: string) => {
	router.push({ path: `/product-category/${code}/edit` })
}
const onDeleteItem = (code: string) => {
	rowCodeConfirmed.value = null
	console.log('Delete:', code)
}
</script>
