<template>
	<div
		class="amount-card rounded-12 elevation-2 pa-4 relative"
		:class="[`bg-${color}-lighten-5`]"
	>
		<div class="amount-card-wrapper">
			<div class="amount-card__head">
				<div
					class="amount-card__head--title d-flex align-center justify-space-between"
				>
					<p class="text-14px font-weight-semibold mb-1">
						{{ title }}
					</p>
					<v-icon
						:icon="icon"
						:size="40"
						variant="tonal"
						density="comfortable"
						:color="`${color.split('-')[0]}-lighten-3`"
						:style="{
							position: 'absolute',
							right: '12px',
							top: '12px',
						}"
						class="transition-all"
					/>
				</div>
			</div>
			<div class="amount-card__body">
				<div class="amount-card__body--amount">
					<p
						class="font-weight-bold mt-1 transition-all"
						:class="[
							sidebar.collapse
								? ['text-32px', 'line-height-40px']
								: ['text-24px', 'line-height-28px'],
						]"
					>
						{{ mainAmount }}
						<span
							v-if="changePercent !== 0"
							class="font-weight-bold text-14px"
							:class="[
								+changePercent < 0
									? 'text-red-darken-1'
									: 'text-green-darken-1',
							]"
						>
							{{ +changePercent > 0 ? '+' : '-'
							}}{{ Math.abs(+changePercent) }}%
						</span>
					</p>
				</div>
				<div
					v-if="totalAmount"
					class="amount-card__body--total mt-1"
				>
					<p class="text-12px font-weight-medium text-grey">
						Tổng cộng:
						<span class="font-weight-bold text-14px text-grey-darken-2">{{
							totalAmount
						}}</span>
					</p>
				</div>
				<div
					v-if="+changePercent !== 0"
					class="amount-card__body--change d-flex align-center"
				>
					<p class="text-12px font-weight-medium text-grey">
						{{ startDay }} ~ {{ finishDay }}:
					</p>
					<div class="font-weight-bold text-14px d-flex align-center ml-2">
						<p
							:class="[
								+changePercent < 0
									? 'text-red-darken-1'
									: 'text-green-darken-1',
							]"
						>
							{{
								changeAmount.toString().startsWith('-')
									? changeAmount.toString().slice(1)
									: changeAmount
							}}
						</p>
						<v-icon
							:icon="+changePercent < 0 ? mdiArrowDownThin : mdiArrowUpThin"
							:color="+changePercent < 0 ? 'red-darken-1' : 'green-darken-1'"
							class="ml-n1 mr-n2"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { mdiArrowDownThin, mdiArrowUpThin } from '@mdi/js'
import moment from 'moment-timezone'
import { momentTimezone } from '~/constants'

interface Props {
	icon: string
	title: string
	mainAmount: string | number
	changeAmount: number | string
	changePercent: number | string
	totalAmount: string | number
	color: string
}

const props = defineProps<Props>()
const sidebar = useSidebar()
const statisticTotalAmount = useStatisticTotalAmount()

const startDay = computed(() => {
	return moment
		.tz(momentTimezone)
		.subtract(statisticTotalAmount.duration + 1, 'd')
		.format('DD/MM')
})

const finishDay = computed(() => {
	return moment.tz(momentTimezone).format('DD/MM')
})
</script>

<style scoped></style>
