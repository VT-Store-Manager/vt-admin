<template>
	<v-table class="bg-secondary">
		<thead>
			<tr>
				<slot name="head"></slot>
			</tr>
		</thead>
		<tbody>
			<slot name="data"></slot>
		</tbody>
	</v-table>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.v-table {
	border-radius: 1rem;
	thead {
		:deep(th:first-child) {
			border-top-left-radius: 12px;
			border-bottom-left-radius: 12px;
		}
		:deep(th:last-child) {
			border-top-right-radius: 12px;
			border-bottom-right-radius: 12px;
		}
	}
	:deep(tr) {
		position: relative;
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
	:deep(.ellipsis-2) {
		overflow: hidden;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
}
</style>
