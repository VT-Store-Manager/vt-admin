<template>
	<organism-data-table
		:headers="headers"
		:items="items"
		:pagination="pagination"
		:total-item-amount="totalCount"
		:loading="pending"
		editable
		:update-page-fn="updatePage"
	>
		<template #name="{ item }">
			<v-hover>
				<template #default="{ isHovering, props }">
					<nuxt-link
						v-bind="props"
						:to="`/store/employee/${item.id}`"
						class="d-flex align-center"
						:style="{ height: '70px' }"
					>
						<atom-img
							class="mr-4 rounded-circle small-img-shadow"
							:src="item.avatar"
							height="50"
							max-width="50"
							aspect-ratio="1/1"
							server-img
						/>
						<div>
							<p class="font-weight-medium d-flex align-center text-16px">
								<molecule-icon-gender
									:gender="item.gender"
									class="mr-1"
								/>
								<span
									class="transition-color pb-1"
									:class="{
										'text-primary': isHovering,
									}"
								>
									{{ item.name }}
								</span>
							</p>
							<p class="text-14px">
								{{ getPhoneFormat(item.phone) }}
							</p>
						</div>
					</nuxt-link>
				</template>
			</v-hover>
		</template>
		<template #store="{ item }">
			<v-hover v-if="getStoreData(item.store)">
				<template #default="{ isHovering, props }">
					<atom-link
						:to="'/store/' + item.store"
						class="d-flex align-center py-2"
						v-bind="props"
					>
						<atom-img
							class="mr-4 rounded small-img-shadow"
							:src="getStoreData(item.store)?.images[0]"
							height="40"
							max-width="40"
							aspect-ratio="1/1"
							:class="{ 'hover-blur': isHovering }"
							server-img
						/>
						<span
							class="ellipsis-2 text-16px font-weight-medium transition-color"
							:class="{ 'text-primary': isHovering }"
						>
							{{ getStoreData(item.store)?.name }}
						</span>
					</atom-link>
				</template>
			</v-hover>
		</template>
		<template #createdAt="{ item }">
			<molecule-date-from-now
				:date="item.createdAt"
				class="text-center text-16px"
			/>
		</template>
	</organism-data-table>
</template>

<script setup lang="ts">
import { EmployeeListItemModel } from '~/models'
import { TableHeader } from '~/types'

const employeeList = useEmployeeList()
const { items, totalCount, pending, pagination } = storeToRefs(employeeList)
const { storeMap } = storeToRefs(useStoreList())
const { updatePage } = employeeList

const headers = computed<TableHeader<EmployeeListItemModel>[]>(() => {
	return [
		{
			title: 'Tên nhân viên',
			key: 'name',
			sortable: true,
		},
		{
			title: 'Cửa hàng',
			key: 'store',
			sortable: true,
		},
		{
			title: 'Làm việc từ',
			key: 'createdAt',
			sortable: true,
			centerHead: true,
		},
	]
})

const getStoreData = (id: string) => {
	return storeMap.value.get(id)
}
</script>

<style scoped></style>
