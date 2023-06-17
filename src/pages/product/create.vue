<template>
	<molecule-list-page-container
		page-name="New product"
		scroll
	>
		<v-row class="card-container">
			<v-col cols="4">
				<atom-card class="pb-4">
					<template #title>
						<div class="d-flex align-center justify-space-between">
							<h4>Images</h4>
							<atom-btn
								class="font-weight-semibold"
								variant="tonal"
								color="danger"
								@click="images = []"
							>
								Clear
							</atom-btn>
						</div>
					</template>
					<template #subtitle> Max {{ maxFiles }} files </template>
					<template #item>
						<organism-file-panel
							v-model="images"
							:max-files="maxFiles"
						/>
					</template>
				</atom-card>
			</v-col>
			<v-col cols="8">
				<atom-card>
					<template #title>
						<div class="d-flex align-center justify-space-between">
							<h4>Content</h4>
							<atom-btn
								class="font-weight-semibold"
								variant="tonal"
								color="danger"
							>
								Clear
							</atom-btn>
						</div>
					</template>
					<v-container class="content-form-container">
						<v-row>
							<v-col cols="8">
								<molecule-input
									v-model="name"
									input-type="text-field"
									label="Product name"
								/>
							</v-col>
							<v-col cols="4">
								<molecule-input
									v-model="category"
									input-type="autocomplete"
									label="Category"
									:items="[
										'California',
										'Colorado',
										'Florida',
										'Georgia',
										'Texas',
										'Wyoming',
									]"
								/>
							</v-col>
							<v-col cols="12">
								<molecule-input
									v-mode="description"
									input-type="textarea"
									label="Product description"
								/>
							</v-col>
							<v-col cols="4">
								<molecule-input
									v-model="price"
									input-type="number-field"
									label="Product price"
									suffix="VND"
								/>
							</v-col>
							<v-col cols="8">
								<molecule-input
									v-model="selectedOptions"
									input-type="select-multi"
									label="Product options"
									:items="options"
									chips
									clearable
									select-all
									:chip="{
										props: {
											color: 'red',
										},
									}"
								/>
							</v-col>
						</v-row>
					</v-container>
				</atom-card>
			</v-col>
		</v-row>
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
const options = ref(['Option 1', 'Option 2', 'Option 3'])

const images = ref<File[]>([])
const maxFiles = 6
const name = ref('')
const category = ref('')
const description = ref('')
const price = ref(0)
const selectedOptions = ref<string[]>([])
</script>

<style lang="scss" scoped>
.content-form-container {
	.v-col {
		padding-top: 0;
		padding-bottom: 0;
	}
}
</style>
