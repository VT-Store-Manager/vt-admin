<template>
	<template-page-container page-name="Product option">
		<template #subtitle>
			<p>{{ productOptionData ? productOptionData.length : 0 }} options</p>
		</template>
		<template #title-right>
			<base-progress-circular
				v-show="productOptionList.loading"
				:class="{ done: !productOptionList.loading }"
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
				@created="refreshData"
				@close-modal="showCreateModal = false"
			/>
		</template>
		<base-table v-show="!productOptionList.loading || !firstLoad">
			<template #head>
				<base-table-th
					title="ID"
					:sorting-field-name="sortingFieldName"
					field-name="id"
					@sort="onDataSort"
				/>
				<base-table-th
					title="Name"
					:sorting-field-name="sortingFieldName"
					field-name="name"
					:style="{ width: '300px' }"
					@sort="onDataSort"
				/>
				<base-table-th
					title="Option items"
					:sortable="false"
					:show-sort-icon="false"
				/>
				<base-table-th
					title="Range select"
					:sortable="false"
					:show-sort-icon="false"
				/>
				<base-table-th
					title="Used"
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
						<v-hover v-slot="{ isHovering: hoveringId, props: idProps }">
							<nuxt-link
								:to="`/product-option/${row.id}`"
								v-bind="idProps"
								:class="{ 'text-primary-darken': hoveringId }"
							>
								{{ row.code }}
								<v-tooltip
									activator="parent"
									location="start"
								>
									{{ row.id }}
								</v-tooltip>
							</nuxt-link>
						</v-hover>
					</td>
					<td class="d-flex align-center">
						<v-hover v-slot="{ isHovering: hoveringName, props: nameProps }">
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
						</v-hover>
						<v-hover
							v-if="row.parent"
							v-slot="{ isHovering: hoveringName, props: nameProps }"
						>
							<nuxt-link
								:to="'/product-option/' + row.parent"
								class="d-flex align-center"
								v-bind="nameProps"
							>
								<v-btn
									variant="plain"
									size="x-small"
									:ripple="false"
									:color="hoveringName ? 'primary' : 'grey'"
								>
									<v-icon
										:icon="mdiLinkVariantPlus"
										size="18"
									/>
									<v-tooltip
										activator="parent"
										open-delay="500"
									>
										Go to Parent
									</v-tooltip>
								</v-btn>
							</nuxt-link>
						</v-hover>
					</td>
					<td>
						<span class="ellipsis-2">
							{{ row.items.map(item => `${item.name}`).join(' | ') }}
							<v-tooltip
								activator="parent"
								:max-width="300"
								location="bottom start"
								open-delay="500"
							>
								<template
									v-for="item in row.items"
									:key="item.key"
								>
									{{ `${item.name} - ${item.cost}đ` }}
									<br />
								</template>
							</v-tooltip>
						</span>
					</td>
					<td>
						<span>
							Min: {{ row.range[0] || 0 }}, Max: {{ row.range[1] || '_' }}
						</span>
					</td>
					<td>
						<span>
							{{ row.used || 0 }}
							<v-tooltip
								activator="parent"
								:disabled="!row.used"
							>
								{{ row.used }}
							</v-tooltip>
						</span>
					</td>
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
					v-if="productOptionList.error || !productOptionData"
					colspan="6"
				>
					Get product option data error: {{ productOptionList.error }}
				</td>
				<td
					v-else-if="productOptionData?.length === 0"
					colspan="6"
				>
					No data
				</td>
			</template>
		</base-table>
	</template-page-container>
</template>

<script lang="ts" setup>
import { mdiLinkVariantPlus } from '@mdi/js'
import { ProductOptionListItemModel } from '~/models/product/product-option'

useSeoMeta({
	title: 'Product options'
})

const productOptionList = useProductOptionList()
const productOptionData = ref<ProductOptionListItemModel[]>([])

const sortingFieldName = ref<undefined | keyof ProductOptionListItemModel>(
	undefined
)
const showCreateModal = ref(false)
const firstLoad = ref(true)
const rowCodeConfirmed = ref<null | string>(null)
const router = useRouter()

const refreshData = async () => {
	sortingFieldName.value = undefined
	await productOptionList.fetch()

	productOptionData.value = productOptionList.response?.data
		? [...productOptionList.response.data]
		: []
}

const onDataSort = (fieldName: string, ascOrder: boolean) => {
	sortingFieldName.value = fieldName as keyof ProductOptionListItemModel
	productOptionData.value?.sort(
		dataCompareFunc<ProductOptionListItemModel>(
			sortingFieldName.value,
			ascOrder
		)
	)
}

refreshData()

watch(
	() => productOptionList.loading,
	() => {
		if (!productOptionList.loading && firstLoad.value) firstLoad.value = false
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
