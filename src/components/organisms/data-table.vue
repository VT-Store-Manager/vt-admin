<template>
	<div class="data-table">
		<div
			class="table-wrapper elevation-3"
			:class="{ 'pb-12': pagination }"
		>
			<molecule-interval-progress-linear :loading="loading" />
			<atom-table
				class="table-inner"
				fixed-header
			>
				<thead class="table-header">
					<tr class="table-header-row">
						<th
							v-for="col in headers"
							:key="col.key"
							class="table-col-header"
							:class="[`text-${col.align || 'left'}`]"
						>
							<atom-btn
								variant="text"
								:ripple="false"
								class="font-weight-bold"
								color="dark-grey"
							>
								{{ col.title }}
								<temp-icon
									:icon="mdiMenuDown"
									:size="26"
								/>
							</atom-btn>
						</th>
						<th v-if="editable">
							<atom-btn
								variant="text"
								:ripple="false"
								class="font-weight-bold prevent-event text-right"
								color="dark-grey"
							>
								Actions
							</atom-btn>
						</th>
					</tr>
				</thead>
				<tbody class="table-body">
					<tr
						v-for="(item, index) in items"
						:key="item?.id || item?.code || index"
						class="table-body-row"
					>
						<template
							v-for="col in headers"
							:key="col.key"
						>
							<td v-if="$slots[col.key]">
								<slot
									:name="col.key"
									:item="item"
								></slot>
							</td>
							<td v-else>
								{{
									col.calculate
										? col.calculate(_get(item, col.key) ?? col.default)
										: _get(item, col.key) ?? col.default
								}}
							</td>
						</template>
						<td v-if="editable">
							<molecule-btn-action-group
								edit
								delete
							/>
						</td>
					</tr>
				</tbody>
			</atom-table>
		</div>
		<molecule-table-pagination
			v-if="pagination"
			:current-page="currentPage"
			:max-per-page="itemsPerPage"
			:data-amount="totalItemAmount"
		/>
	</div>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
import _get from 'lodash/get'
import { mdiMenuDown } from '@mdi/js'
import { TableHeader } from '~/types'

interface Props {
	headers: TableHeader<T>[]
	editable?: boolean
	items: T[]
	itemsLength: number
	pagination?: boolean
	itemsPerPage?: number
	currentPage?: number
	totalItemAmount: number
	loading?: boolean
	itemKey?: string
}

withDefaults(defineProps<Props>(), {
	headers: () => [],
	pagination: false,
	itemsPerPage: 10,
	currentPage: 1,
	loading: false,
	itemKey: 'id',
})
defineSlots<Record<string, (props: { item: T }) => any>>()
</script>

<style lang="scss" scoped>
.data-table {
	height: 100%;
	.table-wrapper {
		height: 100%;
	}
	:deep(.v-table) {
		height: 100%;
		background-color: transparent;
		.v-table__wrapper {
			overflow-y: scroll;
			max-height: 100%;
			background-color: rgb(var(--v-theme-surface));
			padding-left: 12px;
			&::-webkit-scrollbar-thumb {
				border-top-width: 56px;
			}
		}
	}
}
</style>
