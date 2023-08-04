<template>
	<molecule-list-page-container
		page-name="Chi tiết phân loại"
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
		<v-row v-if="categoryData">
			<v-col cols="3">
				<p class="font-weight-bold">Ảnh</p>
				<v-divider class="mt-2 mb-4" />
				<v-row dense>
					<v-col cols="12">
						<atom-img
							class="rounded-circle small-img-shadow"
							:src="categoryData.image"
							aspect-ratio="1/1"
							server-img
							server-alt-img
							lazy-src="/img/default/product.png"
						/>
					</v-col>
				</v-row>
			</v-col>
			<v-col
				cols="9"
				class="pl-8"
			>
				<p class="font-weight-bold mb-2">Thông tin chi tiết</p>
				<v-divider class="mt-2 mb-4" />
				<v-row dense>
					<v-col cols="8">
						<molecule-input
							:model-value="categoryData.name"
							input-type="text-field"
							label="Tên loại"
							readonly
							variant="solo-filled"
							bg-color="white"
						/>
					</v-col>
					<v-col
						cols="3"
						offset="1"
					>
						<atom-label label="Nổi bật" />
						<v-switch
							:model-value="categoryData.isFeatured"
							inset
							color="primary"
							flat
							readonly
						/>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</molecule-list-page-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

const categoryDetail = useProductCategoryDetail()
const { categoryData } = storeToRefs(categoryDetail)

const route = useRoute()
const categoryId = route.params.id as string

if (categoryId) {
	categoryDetail.fetch(categoryId)
}
</script>

<style lang="scss" scoped></style>
