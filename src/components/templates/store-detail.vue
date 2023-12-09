<template>
	<v-row v-if="storeData">
		<v-col cols="4">
			<atom-labeled-sheet
				label="Images"
				class="pt-8 pb-6"
			>
				<p class="text-14px text-grey font-weight-medium text-right mb-2">
					{{ storeData.images.length }}/6 images
				</p>
				<v-row dense>
					<v-col cols="12">
						<atom-img
							class="rounded small-img-shadow cursor-pointer"
							:src="storeData.images[0]"
							:aspect-ratio="2"
							server-img
							server-alt-img
							lazy-src="/img/default/product.png"
						/>
					</v-col>
					<v-col
						v-for="image in storeData.images.slice(1)"
						:key="image"
						cols="6"
					>
						<atom-img
							class="rounded small-img-shadow cursor-pointer"
							:src="image"
							:aspect-ratio="2"
							server-img
							server-alt-img
							lazy-src="/img/default/product.png"
						/>
					</v-col>
				</v-row>
			</atom-labeled-sheet>
		</v-col>
		<v-col cols="8">
			<v-row>
				<v-col cols="12">
					<atom-labeled-sheet
						label="Information"
						class="pt-10 pb-6"
					>
						<v-row>
							<v-col cols="7">
								<molecule-input
									v-model="storeData.name"
									input-type="text-field"
									label="Store name"
									readonly
									hide-details
								/>
							</v-col>
							<v-col cols="5">
								<molecule-input-time-period
									v-model="storeData.openTime"
									:input-props="{
										readonly: true,
										hideDetails: true,
									}"
								/>
							</v-col>
							<v-col cols="12">
								<molecule-input
									:model-value="fullAddress"
									input-type="text-field"
									label="Address"
									readonly
									hide-details
								/>
							</v-col>
						</v-row>
					</atom-labeled-sheet>
				</v-col>
				<v-col cols="12">
					<atom-labeled-sheet
						label="Unavailable goods"
						class="pt-10 pb-6"
					>
						<v-row>
							<v-col cols="4">
								<p class="font-weight-bold mb-2">Products</p>
								<p
									v-if="storeData.unavailableGoods.product.length === 0"
									class="font-italic text-grey text-14px"
								>
									No unavailable
								</p>
								<div
									v-else
									class="unavailable-list"
								>
									<v-hover
										v-for="item in storeData.unavailableGoods.product"
										:key="item.id"
									>
										<template
											#default="{ isHovering: hoveringName, props: nameProps }"
										>
											<atom-link
												:to="'/product/' + item.id"
												class="d-flex align-center"
											>
												<atom-img
													class="mr-4 my-2 rounded small-img-shadow"
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
													<atom-link
														:to="`/product/category/${item.category}`"
														class="text-12px"
														highlight-hover
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
								<p class="font-weight-bold mb-2">Categories</p>
								<p
									v-if="storeData.unavailableGoods.category.length === 0"
									class="font-italic text-grey text-14px"
								>
									No unavailable
								</p>
								<div
									v-else
									class="unavailable-list"
								>
									<v-hover
										v-for="item in storeData.unavailableGoods.category"
										:key="item.id"
									>
										<template
											#default="{ isHovering: hoveringName, props: nameProps }"
										>
											<atom-link
												:to="'/product/category/' + item.id"
												class="d-flex align-center"
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
														{{ item.amountOfProduct }} sản phẩm
													</span>
												</div>
											</atom-link>
										</template>
									</v-hover>
								</div>
							</v-col>
							<v-col cols="4">
								<p class="font-weight-bold mb-2">Options</p>
								<p
									v-if="storeData.unavailableGoods.option.length === 0"
									class="font-italic text-grey text-14px"
								>
									No unavailable
								</p>
								<div
									v-else
									class="unavailable-list"
								>
									<v-hover
										v-for="item in storeData.unavailableGoods.option"
										:key="item.id"
									>
										<template
											#default="{ isHovering: hoveringName, props: nameProps }"
										>
											<atom-link
												:to="'/product/option/' + item.id"
												class="d-flex align-center"
											>
												<div class="d-flex flex-column justify-center py-1">
													<span
														v-bind="nameProps"
														class="ellipsis-2 text-14px font-weight-medium"
														:class="{ 'text-primary': hoveringName }"
													>
														{{ item.name }}
														<span
															class="text-12px font-italic text-grey-darken-2"
														>
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
					</atom-labeled-sheet>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
const { storeData } = storeToRefs(useStoreDetail())

const fullAddress = computed(() => {
	if (!storeData.value?.address) return ''

	const { street, ward, district, country } = storeData.value.address
	return [street, ward, district, country].filter(s => !!s).join(', ')
})
</script>

<style scoped></style>
