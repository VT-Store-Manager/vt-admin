<template>
	<div class="table-list-pagination pagination-mask">
		<div class="pagination-wrapper">
			<atom-pagination
				v-model="page"
				:length="numberOfPage"
				size="36"
				:total-visible="totalVisible"
				rounded="lg"
				:prev-icon="mdiMenuLeft"
				:next-icon="mdiMenuRight"
				@update:model-value="changePagination"
			/>
			<div class="pagination-adjust d-flex align-center">
				<span>Amount:</span>
				<atom-select
					v-model="maxPerPage"
					density="compact"
					:items="maxPerPageOptions"
					:hide-details="true"
					variant="solo"
					class="rounded-lg"
					@update:model-value="changePagination"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { mdiMenuLeft, mdiMenuRight } from '@mdi/js'

interface Props {
	currentPage: number
	maxPerPage: number
	totalVisible?: number
	dataAmount: number
}

const props = withDefaults(defineProps<Props>(), {
	totalVisible: 5,
})
const page = ref(props.currentPage)
const maxPerPageOptions = [5, 10, 25, 50]
const maxPerPage = ref(props.maxPerPage)

const numberOfPage = computed(() =>
	Math.ceil(props.dataAmount / maxPerPage.value)
)

const changePagination = () => {
	if (numberOfPage.value < page.value) {
		page.value = numberOfPage.value
	}
	useEmit('update-page', { page: page.value, limit: maxPerPage.value })
}
</script>

<style lang="scss" scoped>
.pagination-mask {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	background-color: rgb(var(--v-theme-background));
	.pagination-wrapper {
		position: relative;
		.v-pagination {
			:deep(.v-pagination__item) {
				&.v-pagination__item--is-active {
					.v-btn {
						color: $primary-color;
						.v-btn__overlay {
							background-color: $primary-darken-color;
						}
					}
				}
				.v-btn__content {
					font-size: 0.875rem;
					font-weight: 600;
				}
			}
		}
		.pagination-adjust {
			position: absolute;
			bottom: 2px;
			right: 2px;
			span {
				margin-right: 8px;
				font-weight: 500;
			}
			*,
			:deep(*) {
				font-size: 0.8125rem;
				color: #666;
			}
			.v-select {
				:deep(.v-input__control) {
					width: 2.5rem;
					height: 2rem;
					.v-field {
						padding: 0;
						border-radius: 8px;
						.v-field__input {
							padding: 4px 0;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 14px;
							min-height: unset;
							height: 100%;
							transform: translateX(5px);
							font-weight: 600;
						}
						.v-field__append-inner {
							transform: translateX(-3px);
						}
					}
				}
			}
		}
	}
}
</style>
