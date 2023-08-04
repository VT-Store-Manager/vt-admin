<template>
	<div class="data-table bg-white overflow-hidden">
		<molecule-interval-progress-linear :loading="loading" />
		<div
			class="table-wrapper elevation-3"
			:class="{ 'pb-15': pagination }"
		>
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
							<div class="d-flex align-center">
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
										v-if="col.sortable"
										class="sort-icon"
										:icon="mdiMenuDown"
										:size="26"
									/>
								</atom-btn>
							</div>
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
								<span>&nbsp;</span>
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
						<td class="font-weight-semibold">
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
										? col.calculate(_get(item, col.key) ?? col.default, item)
										: _get(item, col.key) ?? col.default
								}}
							</td>
						</template>
						<td v-if="editable">
							<molecule-btn-action-group
								edit
								delete
								@click:edit="
									$router.push(
										`${$route.path}/${item[idFieldName || 'id']}/edit`
									)
								"
							/>
						</td>
					</tr>
				</tbody>
			</atom-table>
		</div>
		<molecule-table-pagination
			v-if="pagination && totalItemAmount"
			:current-page="pagination.page"
			:max-per-page="pagination.limit"
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
	idFieldName?: string
	items: T[]
	pagination?: Pagination
	totalItemAmount?: number
	loading?: boolean
	itemKey?: string
	updatePageFn?: (_pagination: Pagination) => void
}

const props = withDefaults(defineProps<Props>(), {
	headers: () => [],
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

if (props.updatePageFn) {
	useListener('update-page', props.updatePageFn)
}
onBeforeUnmount(() => {
	if (props.updatePageFn) {
		useOmit('update-page', props.updatePageFn)
	}
})
</script>

<style lang="scss" scoped>
.data-table {
	height: 100%;
	border-radius: $common-round;
	.table-wrapper {
		height: 100%;
		padding: 20px 12px 12px 24px;
	}
	:deep(.v-table) {
		height: 100%;
		background-color: transparent;
		.v-table__wrapper {
			overflow-y: scroll;
			max-height: 100%;
			padding-bottom: 10px;
			&::-webkit-scrollbar-thumb {
				visibility: hidden;
			}
		}
	}
	.table-header {
		background-color: #f0f0f0;
		.table-header-row {
			.table-col-header {
				border-top: 2px solid rgba(0, 0, 0, 0.1) !important;
				border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
				background-color: #f0f0f0;
				text-transform: uppercase;
				&:first-child {
					border-left: 2px solid rgba(0, 0, 0, 0.1) !important;
					border-top-left-radius: 12px;
					border-bottom-left-radius: 12px;
				}
				&:last-child {
					border-right: 2px solid rgba(0, 0, 0, 0.1) !important;
					border-top-right-radius: 12px;
					border-bottom-right-radius: 12px;
				}
				.v-btn {
					width: 100%;
					padding: 0;
					justify-content: flex-start;
					:deep(.v-btn__content) {
						position: relative;
						text-transform: uppercase;
						color: black;
						font-weight: bold;
						transition: color 0.3s;
						letter-spacing: normal;
						white-space: break-spaces;
						.sort-icon {
							position: absolute;
							top: 50%;
							left: 100%;
							transform: translate(-2px, -50%);
						}
					}
					&:hover {
						:deep(.v-btn__overlay) {
							opacity: 0;
						}
						:deep(.v-btn__content) {
							color: $primary-color;
						}
					}
				}
			}
		}
	}
	.table-body {
		tr {
			position: relative;
			@for $i from 1 through 25 {
				&:nth-child(#{$i * 2}) {
					background-color: #f0f0f0;
					td:first-child {
						border-top-left-radius: 10px;
						border-bottom-left-radius: 10px;
					}
					td:last-child {
						border-top-right-radius: 10px;
						border-bottom-right-radius: 10px;
					}
				}
			}
			td {
				border-bottom: 0 !important;
			}
		}
		td {
			font-size: 1rem;
			font-weight: 500;
			*,
			:deep(p, span) {
				font-size: 0.875rem;
				font-weight: 500;
			}
		}
	}
}
</style>
