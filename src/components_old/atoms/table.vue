<template>
	<v-table class="bg-secondary">
		<thead>
			<tr>
				<slot name="head"></slot>
			</tr>
		</thead>
		<tbody>
			<slot name="data"></slot>
			<tr class="alternative-row">
				<slot name="alternative-row"></slot>
			</tr>
		</tbody>
	</v-table>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.v-table {
	border-radius: 1rem;
	thead {
		:deep(th) {
			border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
			&:first-child {
				border-left: 1px solid rgba(0, 0, 0, 0.1) !important;
				border-top-left-radius: 12px;
				border-bottom-left-radius: 12px;
			}
			&:last-child {
				border-right: 1px solid rgba(0, 0, 0, 0.1) !important;
				border-top-right-radius: 12px;
				border-bottom-right-radius: 12px;
			}
		}
	}
	:deep(tr) {
		position: relative;
		@for $i from 1 through 10 {
			&:nth-child(#{$i * 2}) {
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
	:deep(.v-table__wrapper) {
		padding: 1.5rem;
		border-radius: 10px;
		overflow: visible;
	}
	:deep(tbody span),
	:deep(tbody p),
	:deep(tbody td) {
		font-size: 0.875rem;
		font-weight: 500;
	}
	:deep(td .v-chip) {
		font-weight: 600;
		font-size: 0.8125rem;
	}
	:deep(.ellipsis-2),
	:deep(th .v-btn .v-btn__content) {
		overflow-y: clip;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	tr.alternative-row {
		:deep(td) {
			text-align: center;
			font-style: italic;
			opacity: 0.5;
		}
	}
}
</style>
