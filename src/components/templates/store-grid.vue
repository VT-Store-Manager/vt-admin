<template>
	<v-container fluid>
		<v-row>
			<v-col
				v-for="item in items"
				:key="item.id"
				cols="12"
				sm="6"
				md="4"
				lg="3"
				xl="2"
			>
				<v-card class="store-item rounded-lg">
					<v-carousel
						:show-arrows="
							!item.images || item.images.length < 2 ? false : 'hover'
						"
						height="200"
						hide-delimiter-background
						:hide-delimiters="!item.images || item.images.length < 2"
					>
						<v-carousel-item
							v-for="(img, index) in item.images"
							:key="index"
							:src="serverImgUrl + img"
							cover
						>
							<template #placeholder>
								<div class="d-flex align-center justify-center fill-height">
									<v-progress-circular
										color="grey-lighten-4"
										indeterminate
									/>
								</div>
							</template>
						</v-carousel-item>
					</v-carousel>
					<v-card-title @click="onCardClick(item.id)">
						{{ item.name }}
					</v-card-title>
					<v-card-subtitle
						class="px-4"
						@click="onCardClick"
					>
						{{ fullAddress(item.address) }}
					</v-card-subtitle>
					<v-card-actions
						class="px-4 pt-4"
						@click="onCardClick"
					>
						<v-spacer />
						<p class="small-info text-grey">
							<molecule-date-from-now
								:date="item.updatedAt"
								class="text-center text-16px"
							/>
						</p>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">

import { StoreListItemModel } from '~/models'

const storeList = useStoreList()
const { items, pending, totalCount } = storeToRefs(storeList)
const { updatePage } = storeList
const serverImgUrl = useRuntimeConfig().public.imgResourceUrl

const fullAddress = (address: StoreListItemModel['address']) => {
	const { street, ward, district, country } = address
	return [street, ward, district, country].filter(s => !!s).join(', ')
}

const onCardClick = (storeId: string) => {
	useRouter().push('/store/' + storeId)
}
</script>

<style lang="scss" scoped>
.store-item.v-card {
	box-shadow: 0 0 10px #00000033;
	height: 100%;
	transition: transform 200ms;
	&:hover {
		transform: scale(1.03);
		.v-carousel {
			opacity: 1;
			filter: grayscale(0);
		}
	}
	.v-carousel {
		opacity: 0.9;
		filter: grayscale(20%);
		:deep(.v-window__controls) {
			padding-left: 0.75rem;
			padding-right: 0.75rem;
			.v-btn {
				width: 1.75rem;
				height: 1.75rem;
				.v-icon {
					font-size: 1.25rem;
				}
			}
		}
		:deep(.v-carousel__controls) {
			.v-btn {
				width: 1rem;
				height: 1rem;
				margin: 2px;
				color: rgba(255, 255, 255, 0.7);
				&.v-btn--active {
					color: rgb(var(--v-theme-primary));
					transform: scale(1.4);
				}
				.v-icon {
					font-size: 0.75rem;
				}
			}
		}
	}
	.v-card-title {
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.5;
		cursor: pointer;
	}
	.v-card-subtitle {
		$line-height: 1.25rem;
		$number-line: 2;
		font-size: 0.8125rem;
		line-height: $line-height;
		height: $number-line * $line-height;
		overflow-y: clip;
		-webkit-line-clamp: $number-line;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		white-space: normal !important;
		cursor: pointer;
	}
	.v-card-actions {
		cursor: pointer;
		.small-info {
			font-size: 12px;
			text-align: right;
		}
	}
}
</style>
