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
							class="table-col-header text-left"
							:style="{ maxWidth: '50px' }"
						>
							<atom-btn
								variant="text"
								:ripple="false"
								class="font-weight-bold"
								color="dark-grey"
							>
								ID
							</atom-btn>
						</th>
						<th
							v-for="col in headers"
							:key="col.key"
							class="table-col-header"
							:style="{
								width: col.width ? `${col.width}px` : 'auto',
							}"
						>
							<atom-btn
								variant="text"
								:ripple="false"
								class="font-weight-bold"
								color="dark-grey"
								:style="{
									paddingLeft: `${col.offset || 0}px`,
									justifyContent: col.centerHead ? 'center' : 'flex-start',
								}"
							>
								{{ col.title }}
								<v-icon
									class="sort-icon"
									v-if="col.sortable"
									:icon="mdiMenuDown"
									:size="26"
								/>
							</atom-btn>
						</th>
						<th
							v-if="editable"
							class="table-col-header"
						>
							<atom-btn
								variant="text"
								:ripple="false"
								class="font-weight-bold prevent-event justify-end"
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
						<td>
							{{ (startId || 0) + index }}
						</td>
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
							<td
								v-else
								:class="[`text-${col.alignCol || 'left'}`]"
							>
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
import isObject from 'lodash/isObject'
import { mdiMenuDown } from '@mdi/js'
import { Pagination, TableHeader } from '~/types'

interface Props {
	headers: TableHeader<T>[]
	editable?: boolean
	items: T[]
	pagination?: boolean | Pagination
	itemsPerPage?: number
	currentPage?: number
	totalItemAmount: number
	loading?: boolean
	itemKey?: string
}

const props = withDefaults(defineProps<Props>(), {
	headers: () => [],
	pagination: false,
	itemsPerPage: 10,
	currentPage: 1,
	loading: false,
	itemKey: 'id',
})
defineSlots<Record<string, (props: { item: T }) => any>>()

const startId = computed(() => {
	const check = isObject(props.pagination)
	if (!check) {
		return 1
	}
	const pagination = props.pagination as Pagination
	return (pagination.page - 1) * pagination.limit + 1
})
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
	.table-header {
		.table-header-row {
			.table-col-header {
				.v-btn {
					width: 100%;
					padding: 0;
					justify-content: flex-start;
					:deep(.v-btn__content) {
						position: relative;
						.sort-icon {
							position: absolute;
							top: 50%;
							left: 100%;
							transform: translate(-2px, -50%);
						}
					}
				}
			}
		}
	}
}
</style>
