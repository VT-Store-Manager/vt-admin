<template>
	<organism-data-table
		:headers="headers"
		:items="items"
		:pagination="pagination"
		:total-item-amount="totalCount"
		:loading="pending"
		:update-page-fn="updatePage"
		editable
	>
		<template #name="{ item }">
			<v-hover>
				<template #default="{ isHovering: hoveringName, props: nameProps }">
					<atom-link
						:to="'/product-category/' + item.id"
						class="d-flex align-center"
						v-bind="nameProps"
					>
						<atom-img
							class="mr-4 my-2 rounded small-img-shadow"
							:src="item.image"
							height="60"
							:max-width="60"
							:aspect-ratio="1"
							cover
							:class="{ 'hover-blur': hoveringName }"
							server-img
							:style="{ width: '40px' }"
							placeholder="progress"
						/>
						<div class="d-flex flex-column justify-center py-1">
							<span
								class="ellipsis-2"
								:class="{ 'text-primary-darken': hoveringName }"
							>
								{{ item.voucher.title }}
							</span>
						</div>
					</atom-link>
				</template>
			</v-hover>
		</template>
		<template #cost="{ item }">
			<p>
				{{ item.cost }}
				<span>BEAN</span>
			</p>
		</template>
		<template #isFeatured="{ item }">
			<p class="text-center">
				<molecule-icon-check :value="item.isFeatured" />
			</p>
		</template>
		<template #status="{ item }">
			<div class="text-center">
				<molecule-status-chip
					:raw="pick(item, ['disabled', 'deleted'])"
					class="text-14px font-weight-semibold"
				/>
			</div>
		</template>
		<template #publish="{ item }">
			<molecule-publish-chip
				v-bind="pick(item, ['startTime', 'finishTime'])"
				class="text-14px font-weight-semibold"
			/>
		</template>
	</organism-data-table>
</template>

<script lang="ts" setup>
import pick from 'lodash/pick'
import { storeToRefs } from 'pinia'
import { PromotionListItemModel } from '~/models'
import { TableHeader } from '~/types'

const promotionList = usePromotionList()
const { items, totalCount, pending, pagination } = storeToRefs(promotionList)
const { updatePage } = promotionList

const headers: TableHeader<PromotionListItemModel>[] = [
	{
		title: 'Name',
		key: 'name',
		sortable: true,
		calculate: (value, item) => value || item.voucher.title,
	},
	{
		title: 'Cost',
		key: 'cost',
		sortable: true,
	},
	{
		title: 'Featured',
		key: 'isFeatured',
		sortable: true,
		alignCol: 'center',
		centerHead: true,
	},
	{
		title: 'Status',
		key: 'status',
		sortable: true,
		alignCol: 'center',
		centerHead: true,
	},
	{
		title: 'Publish',
		key: 'publish',
		sortable: true,
	},
]
</script>
