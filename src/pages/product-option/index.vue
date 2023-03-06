<template>
	<template-page-container page-name="Product option">
		<template #subtitle>
			<p>{{ productOptionData ? productOptionData.length : 0 }} options</p>
		</template>
		<template #title-right>
			<v-progress-circular
				v-show="productOption.loading"
				:class="{ done: !productOption.loading }"
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
				New option
			</button-create>
			<product-option-create-modal
				:show="showCreateModal"
				@close-modal="showCreateModal = false"
			/>
		</template>
		<base-table v-show="!productOption.loading || !firstLoad">
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
					title="Options"
					:sortable="false"
					:show-sort-icon="false"
				/>
				<base-table-th
					title="Applying"
					:sortable="false"
					:show-sort-icon="false"
				/>
				<base-table-th
					title="Actions"
					:sortable="false"
					:show-sort-icon="false"
					text-align="right"
				/>
			</template>
			<template #data>
				<tr
					v-for="(row, index) in productOptionData || []"
					:key="row.id"
					:class="{ 'bg-screen': index % 2 == 1 }"
				>
					<td>
						<v-hover>
							<template #default="{ isHovering: hoveringId, props: idProps }">
								<nuxt-link
									:to="`/product-option/${row.id}`"
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
									:to="'/product-option/' + row.id"
									class="d-flex align-center"
									v-bind="nameProps"
								>
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
					<td>
						<v-hover v-if="row.parent">
							<template
								#default="{
									isHovering: hoveringParentId,
									props: parentIdProps
								}"
							>
								<nuxt-link
									:to="`/product-option/${row.parent}`"
									v-bind="parentIdProps"
									:class="{ 'text-primary-darken': hoveringParentId }"
								>
									{{ row.parent }}
								</nuxt-link>
							</template>
						</v-hover>
						<template v-else> - </template>
					</td>
					<td>
						<v-tooltip
							:text="
								row.items
									.map(item => `${item.name} (${item.cost}đ)`)
									.join(' | ')
							"
							:max-width="300"
						>
							<template #activator="{ props }">
								<span
									v-bind="props"
									class="ellipsis-2"
								>
									{{
										row.items
											.map(item => `${item.name} (${item.cost}đ)`)
											.join(' | ')
									}}
								</span>
							</template>
						</v-tooltip>
					</td>

					<td>
						<v-tooltip
							v-if="row.applying && row.applying.length > 0"
							:text="row.applying?.join(' | ')"
							:disabled="!row.applying?.length"
						>
							<template #activator="{ props }">
								<span v-bind="props">
									{{ row.applying?.join(' | ') }}
								</span>
							</template>
						</v-tooltip>
						<template v-else> - </template>
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
					v-if="productOption.error || !productOptionData"
					colspan="7"
				>
					Get product option data error: {{ productOption.error }}
				</td>
				<td
					v-else-if="productOptionData?.length === 0"
					colspan="7"
				>
					No data
				</td>
			</template>
		</base-table>
	</template-page-container>
</template>

<script lang="ts" setup>
import { ProductOptionModel } from '~/models/product/product-option'

useSeoMeta({
	title: 'Product options'
})

const productOption = useProductOption()
const productOptionData = ref<ProductOptionModel[]>([])

const fieldNameList: Array<keyof ProductOptionModel> = ['id', 'name', 'parent']
const sortingFieldName = ref<undefined | keyof ProductOptionModel>(undefined)
const showCreateModal = ref(false)
const firstLoad = ref(true)
const rowCodeConfirmed = ref<null | string>(null)
const router = useRouter()

const refreshData = async () => {
	sortingFieldName.value = undefined
	await productOption.fetch()
	productOptionData.value = productOption.data ? [...productOption.data] : []
}

const onDataSort = (fieldName: string, ascOrder: boolean) => {
	sortingFieldName.value = fieldName as keyof ProductOptionModel
	productOptionData.value?.sort(
		dataCompareFunc<ProductOptionModel>(sortingFieldName.value, ascOrder)
	)
}

refreshData()

watch(
	() => productOption.loading,
	() => {
		if (!productOption.loading && firstLoad.value) firstLoad.value = false
	}
)

const onEditItem = (id: string) => {
	router.push({ path: `/product-option/${id}/edit` })
}
const onDeleteItem = (id: string) => {
	rowCodeConfirmed.value = null
	console.log('Delete:', id)
}
</script>
