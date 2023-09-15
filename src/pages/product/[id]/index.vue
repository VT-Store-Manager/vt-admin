<template>
	<molecule-list-page-container
		page-name="Chi tiết sản phẩm"
		scroll
	>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Làm mới"
			/>
			<molecule-btn-delete
				disabled
				class="mr-3"
			>
				Xoá
			</molecule-btn-delete>
			<molecule-btn-edit> Chỉnh sửa </molecule-btn-edit>
		</template>
		<v-row v-if="productData">
			<v-col cols="2">
				<p class="font-weight-bold">Ảnh</p>
				<v-divider class="mt-2 mb-4" />
				<v-row dense>
					<v-col cols="12">
						<atom-img
							class="rounded small-img-shadow"
							:src="productData.images[0]"
							aspect-ratio="1/1"
							server-img
							server-alt-img
							lazy-src="/img/default/product.png"
						/>
					</v-col>
					<v-col
						v-for="image in productData.images.slice(1)"
						:key="image"
						cols="6"
					>
						<atom-img
							class="rounded small-img-shadow"
							:src="image"
							aspect-ratio="1/1"
							server-img
							server-alt-img
							lazy-src="/img/default/product.png"
						/>
					</v-col>
				</v-row>
			</v-col>
			<v-col
				cols="10"
				class="pl-8"
			>
				<p class="font-weight-bold mb-2">Thông tin chi tiết</p>
				<v-divider class="mt-2 mb-4" />
				<v-row dense>
					<v-col
						cols="7"
						class="pr-6"
					>
						<molecule-input
							:model-value="productData.name"
							input-type="text-field"
							label="Tên sản phẩm"
							readonly
							variant="solo-filled"
							bg-color="white"
						/>
					</v-col>
					<v-col cols="5">
						<molecule-input
							v-model="productData.category"
							input-type="select"
							label="Loại sản phẩm"
							:items="categorySelect.data"
							:loading="categorySelect.pending"
							select-one
							readonly
							variant="solo-filled"
							bg-color="white"
						/>
					</v-col>
					<v-col
						cols="3"
						class="pr-6"
					>
						<molecule-input
							:model-value="
								productData.originalPrice.toLocaleString().replace(/,/g, '.')
							"
							input-type="text-field"
							label="Giá sản phẩm"
							suffix="đ"
							step="1000"
							readonly
							variant="solo-filled"
							bg-color="white"
						/>
					</v-col>
					<v-col cols="12">
						<molecule-input
							:model-value="productData.description"
							input-type="textarea"
							label="Mô tả"
							readonly
							variant="solo-filled"
							bg-color="white"
						/>
					</v-col>
					<v-col cols="12">
						<!-- <organism-product-option-select
							:model-value="productData.options"
						/> -->
						<atom-label
							label="Các lựa chọn"
							optional
						/>
						<v-expansion-panels
							multiple
							variant="accordion"
						>
							<v-expansion-panel
								v-for="optionId in productData.options"
								:key="optionId"
								rounded="12"
							>
								<v-expansion-panel-title>
									<p style="width: 100px">
										<atom-link :to="`/product/option/${optionId}`">
											{{ optionList.optionMap.get(optionId)?.name || '' }}
										</atom-link>
									</p>
									<span class="d-inline-block ml-4">
										{{ optionList.optionMap.get(optionId)?.items.length }}
										loại
									</span>
								</v-expansion-panel-title>
								<v-expansion-panel-text>
									<v-list lines="one">
										<v-list-item
											v-for="item in optionList.optionMap.get(optionId)
												?.items || []"
											:key="item.key"
											:title="item.name"
											:subtitle="
												item.cost.toLocaleString().replace(/,/g, '.') + ' đ'
											"
										/>
									</v-list>
								</v-expansion-panel-text>
							</v-expansion-panel>
						</v-expansion-panels>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</molecule-list-page-container>
</template>

<script setup lang="ts">
const productDetail = useProductDetail()
const { productData } = storeToRefs(productDetail)
const categorySelect = useProductCategorySelect()
const optionList = useProductOptionList()

const route = useRoute()
const productId = route.params.id as string
if (productId) {
	productDetail.fetch(productId)
}
</script>

<style lang="scss" scoped></style>
