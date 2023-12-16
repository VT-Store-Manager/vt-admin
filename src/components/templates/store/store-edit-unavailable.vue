<template>
	<atom-labeled-sheet
		label="Unavailable goods"
		class="pt-10 pb-6 d-flex flex-column"
	>
		<molecule-btn-icon-restore
			class="ml-auto mb-4"
			@click="onRestore"
		/>
		<v-row>
			<v-col cols="4">
				<p class="font-weight-bold mb-2 d-flex align-center">
					Products
					<v-hover>
						<template #default="{ props: hoverProps, isHovering }">
							<span
								v-bind="hoverProps"
								class="text-14px font-weight-semibold ml-3 cursor-pointer"
								:class="isHovering ? ['text-primary'] : ['text-grey']"
								@click="onOpenEdit('product')"
							>
								<v-icon
									:icon="mdiPencil"
									:size="14"
									:style="{ marginRight: '-2px' }"
								/>
								Edit
							</span>
						</template>
					</v-hover>
				</p>
				<p
					v-if="displayData.product.length === 0"
					class="font-italic text-grey text-14px"
				>
					No unavailable
				</p>
				<div
					v-else
					class="unavailable-list"
				>
					<v-hover
						v-for="item in displayData.product"
						:key="item.id"
					>
						<template #default="{ isHovering: hoveringName, props: nameProps }">
							<atom-link
								:to="'/product/' + item.id"
								class="d-flex align-center"
								target="_blank"
							>
								<atom-img
									class="mr-4 my-2 rounded small-img-shadow"
									:src="item.images[0]"
									:alt-src="item.images.slice(1)"
									height="40"
									:max-width="40"
									:aspect-ratio="1"
									cover
									:class="{ 'hover-blur': hoveringName }"
									server-img
									:style="{ width: '40px' }"
									placeholder="progress"
								/>
								<div class="d-flex flex-column justify-center py-1">
									<span
										v-bind="nameProps"
										class="ellipsis-2 text-14px font-weight-medium"
										:class="{ 'text-primary': hoveringName }"
									>
										{{ item.name }}
									</span>
									<atom-link
										:to="`/product/category/${item.categoryId}`"
										class="text-12px"
										highlight-hover
										target="_blank"
									>
										{{ item.categoryName }}
									</atom-link>
								</div>
							</atom-link>
						</template>
					</v-hover>
				</div>
			</v-col>
			<v-col cols="4">
				<p class="font-weight-bold mb-2">
					Categories
					<v-hover>
						<template #default="{ props: hoverProps, isHovering }">
							<span
								v-bind="hoverProps"
								class="text-14px font-weight-semibold ml-3 cursor-pointer"
								:class="isHovering ? ['text-primary'] : ['text-grey']"
								@click="onOpenEdit('category')"
							>
								<v-icon
									:icon="mdiPencil"
									:size="14"
									:style="{ marginRight: '-2px' }"
								/>
								Edit
							</span>
						</template>
					</v-hover>
				</p>
				<p
					v-if="displayData.category.length === 0"
					class="font-italic text-grey text-14px"
				>
					No unavailable
				</p>
				<div
					v-else
					class="unavailable-list"
				>
					<v-hover
						v-for="item in displayData.category"
						:key="item.id"
					>
						<template #default="{ isHovering: hoveringName, props: nameProps }">
							<atom-link
								:to="'/product/category/' + item.id"
								class="d-flex align-center"
								target="_blank"
							>
								<atom-img
									class="mr-4 my-2 rounded-pill small-img-shadow"
									:src="item.image"
									height="40"
									:max-width="40"
									:aspect-ratio="1"
									cover
									:class="{ 'hover-blur': hoveringName }"
									server-img
									:style="{ width: '40px' }"
									placeholder="progress"
								/>
								<div class="d-flex flex-column justify-center py-1">
									<span
										v-bind="nameProps"
										class="ellipsis-2 text-14px font-weight-medium"
										:class="{ 'text-primary': hoveringName }"
									>
										{{ item.name }}
									</span>
									<span class="text-12px">
										{{ item.countProduct }} sản phẩm
									</span>
								</div>
							</atom-link>
						</template>
					</v-hover>
				</div>
			</v-col>
			<v-col cols="4">
				<p class="font-weight-bold mb-2">
					Options
					<v-hover>
						<template #default="{ props: hoverProps, isHovering }">
							<span
								v-bind="hoverProps"
								class="text-14px font-weight-semibold ml-3 cursor-pointer"
								:class="isHovering ? ['text-primary'] : ['text-grey']"
								@click="onOpenEdit('option')"
							>
								<v-icon
									:icon="mdiPencil"
									:size="14"
									:style="{ marginRight: '-2px' }"
								/>
								Edit
							</span>
						</template>
					</v-hover>
				</p>
				<p
					v-if="displayData.option.length === 0"
					class="font-italic text-grey text-14px"
				>
					No unavailable
				</p>
				<div
					v-else
					class="unavailable-list"
				>
					<v-hover
						v-for="item in displayData.option"
						:key="item.id"
					>
						<template #default="{ isHovering: hoveringName, props: nameProps }">
							<atom-link
								:to="'/product/option/' + item.id"
								class="d-flex align-center"
								target="_blank"
							>
								<div class="d-flex flex-column justify-center py-1">
									<span
										v-bind="nameProps"
										class="ellipsis-2 text-14px font-weight-medium"
										:class="{ 'text-primary': hoveringName }"
									>
										{{ item.name }}
										<span class="text-12px font-italic text-grey-darken-2">
											({{ item.items.length }} item)
										</span>
									</span>
									<span class="text-12px">
										Áp dụng {{ item.applying }} sản phẩm
									</span>
								</div>
							</atom-link>
						</template>
					</v-hover>
				</div>
			</v-col>
		</v-row>
		<lazy-molecule-dialog
			v-model="showEditDialog"
			:card-attrs="{}"
			:sheet-attrs="{
				width: '95%',
				maxWidth: '700px',
			}"
			:title="`Edit unavailable ${editType}`"
			persistent
		>
			<template #headActions>
				<atom-btn
					size="small"
					class="mr-4 font-weight-bold"
					color="yellow-darken-4"
					variant="tonal"
					elevation="1"
				>
					Reset
				</atom-btn>
			</template>
		</lazy-molecule-dialog>
		<lazy-organism-draggable-list-dialog
			v-if="editType"
			v-model="afterUpdatedGoods[editType]"
			v-model:show="showEditDialog"
			:title="`Edit unavailable ${editType}`"
			:items="allProductData.data[editType]"
			:init-items="initData[editType]"
			item-key="id"
			left-list-title="Unavailable list"
			right-list-title="Available list"
			:persistent="false"
		>
			<template #item="{ item }">
				<div class="d-flex align-center">
					<template v-if="editType === 'product'">
						<atom-img
							class="mr-4 my-2 rounded small-img-shadow"
							:src="item.images[0]"
							:alt-src="item.images.slice(1)"
							height="40"
							:max-width="40"
							:aspect-ratio="1"
							cover
							server-img
							:style="{ width: '40px' }"
							placeholder="progress"
						/>
						<div class="d-flex flex-column justify-center py-1">
							<span class="ellipsis-2 text-14px font-weight-medium">
								{{ item.name }}
							</span>
							<span class="text-12px">
								{{ item.categoryName }}
							</span>
						</div>
					</template>
					<template v-else-if="editType === 'category'">
						<atom-img
							class="mr-4 my-2 rounded-pill small-img-shadow"
							:src="item.image"
							height="40"
							:max-width="40"
							:aspect-ratio="1"
							cover
							server-img
							:style="{ width: '40px' }"
							placeholder="progress"
						/>
						<div class="d-flex flex-column justify-center py-1">
							<span class="ellipsis-2 text-14px font-weight-medium">
								{{ item.name }}
							</span>
							<span class="text-12px"> {{ item.countProduct }} sản phẩm </span>
						</div>
					</template>
					<template v-else-if="editType === 'option'">
						<div class="d-flex flex-column justify-center py-1">
							<span class="ellipsis-2 text-14px font-weight-medium">
								{{ item.name }}
								<span class="text-12px font-italic text-grey-darken-2">
									({{ item.items.length }} item)
								</span>
							</span>
							<span class="text-12px">
								{{ item.items.join(', ') }}
							</span>
							<span class="text-12px">
								Áp dụng {{ item.applying }} sản phẩm
							</span>
						</div>
					</template>
				</div>
			</template>
		</lazy-organism-draggable-list-dialog>

		<div class="d-flex justify-end mt-2">
			<molecule-btn-save-dialog
				:disabled="isNotChanged"
				v-bind="isNotChanged ? { color: 'grey' } : {}"
				:loading="status === 'pending'"
				@click="onSave"
			>
				Save
			</molecule-btn-save-dialog>
		</div>
	</atom-labeled-sheet>
</template>

<script setup lang="ts">
import { mdiPencil } from '@mdi/js'
import isEqual from 'lodash/isEqual'
import { UnavailableGoods } from '~/models'

type EditType = 'product' | 'category' | 'option'

const storeDetail = useStoreDetail()
const allProductData = useAllShortProduct()
const { storeData } = storeToRefs(storeDetail)
const showEditDialog = ref(false)
const editType = ref<EditType>()
const updateStoreUnavailable = useUpdateStoreUnavailable()
const { executeWithPayload } = updateStoreUnavailable
const { error, status } = storeToRefs(updateStoreUnavailable)
const { push } = useAlert()

const initData = computed<UnavailableGoods>(() => {
	if (storeData.value) {
		return storeData.value.unavailableGoods
	}
	return {
		product: [] as string[],
		category: [] as string[],
		option: [] as string[],
	}
})

const afterUpdatedGoods = reactive({ ...initData.value })

const displayData = computed(() => {
	return {
		product: allProductData.data.product.filter(item =>
			afterUpdatedGoods.product.includes(item.id)
		),
		category: allProductData.data.category.filter(item =>
			afterUpdatedGoods.category.includes(item.id)
		),
		option: allProductData.data.option.filter(item =>
			afterUpdatedGoods.option.includes(item.id)
		),
	}
})

const onRestore = () => {
	afterUpdatedGoods.product = [...initData.value.product]
	afterUpdatedGoods.category = [...initData.value.category]
	afterUpdatedGoods.option = [...initData.value.option]
}

const onOpenEdit = (type: EditType) => {
	editType.value = type
	showEditDialog.value = true
}

const isNotChanged = computed(() => {
	return isEqual(
		{
			product: initData.value.product.sort(),
			category: initData.value.category.sort(),
			option: initData.value.option.sort(),
		},
		{
			product: afterUpdatedGoods.product.sort(),
			category: afterUpdatedGoods.category.sort(),
			option: afterUpdatedGoods.option.sort(),
		}
	)
})

const onSave = async () => {
	await executeWithPayload({
		storeId: useRoute().params.id as string,
		product: afterUpdatedGoods.product,
		category: afterUpdatedGoods.category,
		option: afterUpdatedGoods.option,
	})
	if (error.value) {
		push({
			text: 'Cập nhật thất bại',
			description: error.value.message,
			type: 'error',
			duration: 15000,
		})
	} else {
		push({
			text: 'Cập nhật sản phẩm không có sẵn của cửa hàng thành công',
			type: 'success',
			duration: 5000,
		})
		storeDetail.refresh()
	}
}
</script>
