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
				<template #default="{ isHovering: hoveringName, props: nameProps }">
					<nuxt-link
						v-bind="nameProps"
						:to="`/member/${item.rank.code}`"
						class="d-flex align-center"
					>
						<atom-img
							class="mr-4 rounded-circle small-img-shadow"
							:src="getAvatarDefaultUrl(item.gender)"
							:alt-src="[getAvatarDefaultUrl(item.gender)]"
							height="40"
							max-width="40"
							aspect-ratio="1/1"
						/>
						<div>
							<p class="text-1px font-weight-medium d-flex align-center">
								<molecule-icon-gender
									:gender="item.gender"
									class="mr-1"
								/>
								<span
									class="transition-color"
									:class="{
										'text-primary': hoveringName,
									}"
								>
									{{ item.name }}
								</span>
							</p>
							<h5>
								{{ item.rank.code }}
							</h5>
						</div>
					</nuxt-link>
				</template>
			</v-hover>
		</template>
		<template #rank="{ item }">
			<v-hover>
				<template #default="{ isHovering: hoveringRank, props: rankProps }">
					<nuxt-link
						v-bind="rankProps"
						:to="`/rank/${item.rank.info.rank}`"
					>
						<molecule-icon-rank
							:data="item.rank.info"
							show-name
							class="transition-opacity"
							:class="{ 'opacity-7': hoveringRank }"
						/>
					</nuxt-link>
				</template>
			</v-hover>
		</template>
		<template #point="{ item }">
			<div class="d-flex align-center">
				<molecule-icon-rank
					:data="item.rank.info"
					show-icon
				/>
				<span class="font-weight-bold text-grey-darken-2 d-inline-block">
					{{ totalPoint(item.rank) }}
					<v-tooltip
						activator="parent"
						location="right"
					>
						<p>Current point: {{ item.rank.currentPoint }}</p>
						<p>Used point: {{ item.rank.usedPoint }}</p>
						<p>Expired point: {{ item.rank.expiredPoint }}</p>
					</v-tooltip>
				</span>
			</div>
		</template>
		<template #createdAt="{ item }">
			<atom-date-cell
				:date="item.createdAt"
				time-format="hh:mm:ss"
			/>
		</template>
	</organism-data-table>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { TableHeader } from '~/types'
import { MemberItemModel } from '~/composables/apis/use-member-list'
import { Gender } from '~/constants'

const memberList = useMemberList()
const { items, totalCount, pending, pagination } = storeToRefs(memberList)
const { updatePage } = memberList

const headers: TableHeader<MemberItemModel>[] = [
	{
		title: 'Name',
		key: 'name',
		sortable: true,
	},
	{
		title: 'Rank',
		key: 'rank',
		sortable: true,
	},
	{
		title: 'Point',
		key: 'point',
		sortable: true,
	},
	{
		title: 'Joined at',
		key: 'createdAt',
		sortable: true,
	},
]

const totalPoint = (rank: MemberItemModel['rank']) => {
	return rank.currentPoint + rank.expiredPoint + rank.usedPoint
}
const getAvatarDefaultUrl = (gender: keyof typeof Gender) => {
	switch (gender) {
		case 1:
			return '/img/default/avatar-female.svg'
		case 2:
			return '/img/default/avatar-male.svg'
		case 0:
		default:
			return '/img/default/avatar-male.svg'
	}
}
</script>
