<template>
	<div class="d-flex flex-column justify-center">
		<template v-if="dateTimeFormat">
			<span :class="[`text-${fontSize}px}`]">
				{{ $dayjs(date).format(dateTimeFormat) }}
			</span>
		</template>
		<template v-else>
			<p class="d-flex align-center">
				<v-icon
					:icon="mdiCalendarMonth"
					:size="16"
					class="mr-2"
				/>
				<span :class="[`text-${fontSize}px`]">{{
					$dayjs(date).format(dateFormat)
				}}</span>
			</p>
			<p
				v-if="timeFormat"
				class="d-flex align-center"
			>
				<v-icon
					:icon="mdiClockTimeThreeOutline"
					size="16"
					class="mr-2"
				/>
				<span :class="[`text-${fontSize}px`]">{{
					$dayjs(date).format(timeFormat)
				}}</span>
			</p>
		</template>
	</div>
</template>

<script lang="ts" setup>
import { mdiCalendarMonth, mdiClockTimeThreeOutline } from '@mdi/js'

interface Props {
	date: number | string | Date
	dateTimeFormat?: string
	dateFormat?: string
	timeFormat?: string
	fontSize?: number | string
}

withDefaults(defineProps<Props>(), {
	dateFormat: 'YYYY-MM-DD',
	timeFormat: 'HH:mm:ss',
	fontSize: 14,
})
</script>
