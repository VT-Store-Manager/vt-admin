<template>
	<molecule-dashboard-card
		title="Xếp hạng sản phẩm"
		option-button
	>
		<v-row>
			<v-col
				cols="12"
				:style="{ minHeight: '300px' }"
			>
				<v-progress-circular v-if="saleRanking.pending" />
				<template v-else>
					<v-list
						lines="one"
						class="pa-0 mt-n2"
					>
						<v-list-item
							v-for="(item, index) in rankingList"
							:key="item.id"
							class="pa-2"
						>
							<template #prepend>
								<div
									class="ranking-img mr-3"
									:class="[`rank-${index + 1}`]"
								>
									<atom-img
										class="rounded small-img-shadow"
										:src="item.image"
										height="40"
										max-width="40"
										aspect-ratio="1/1"
										server-img
										server-alt-img
										lazy-src="/img/default/product.png"
									/>
								</div>
							</template>
							<template #title>
								<p
									class="text-14px font-weight-medium one-line-overflow-ellipsis"
								>
									{{ item.name }}
								</p>
							</template>
							<template #subtitle>
								<div class="d-flex align-center">
									<p>
										{{ subtitle(item) }}
									</p>
								</div>
							</template>
						</v-list-item>
					</v-list>
				</template>
			</v-col>
		</v-row>
	</molecule-dashboard-card>
</template>

<script setup lang="ts">
import { SaleItemModel } from '~/models'

const saleRanking = useSaleRanking()
const profitRanking = ref(true)

const rankingList = computed(() => {
	return profitRanking.value
		? saleRanking.profitRankingList
		: saleRanking.saleVolumeRankingList
})

const subtitle = (item: SaleItemModel) => {
	return profitRanking.value
		? `Đã bán ${item.profit.toLocaleString().replace(/,/g, '.')} đ`
		: `${item.saleVolume > 9999 ? '9999+' : item.saleVolume} sản phẩm`
}
</script>

<style lang="scss" scoped>
.ranking-img {
	position: relative;
	border-radius: 4px;
	overflow: hidden;
	&::before {
		display: flex;
		position: absolute;
		z-index: 10;
		color: white;
		top: 0;
		right: 0;
		font-weight: bold;
		font-size: 12px;
		justify-content: center;
		width: 16px;
		border-bottom-left-radius: 4px;
	}
	&::after {
		content: '';
		display: block;
		position: absolute;
		z-index: 5;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		border-radius: 4px;
	}
	&.rank-1 {
		&::after {
			border: 2px solid goldenrod;
		}
		background-color: goldenrod;
		&::before {
			content: '1';
			background-color: goldenrod;
		}
	}

	&.rank-2 {
		&::after {
			border: 2px solid silver;
		}
		background-color: silver;
		&::before {
			content: '2';
			background-color: silver;
		}
	}
	&.rank-3 {
		&::after {
			border: 2px solid brown;
		}
		background-color: brown;
		&::before {
			content: '3';
			background-color: brown;
		}
	}
	&.rank-4 {
		&::before {
			content: '4';
			background-color: $primary-color;
		}
	}
	&.rank-5 {
		&::before {
			content: '5';
			background-color: $primary-color;
		}
	}
}
</style>
