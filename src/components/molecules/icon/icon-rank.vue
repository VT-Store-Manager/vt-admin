<template>
	<div class="rank-icon d-flex align-center">
		<atom-img
			v-if="showIcon"
			:src="data.appearance.icon"
			height="16"
			max-width="16"
			server-img
			placeholder="/img/logo/transparent-grey.png"
			class="mr-1"
		/>
		<p
			v-if="showName"
			:style="{ color: darken(0.1, data.appearance.color) }"
			class="text-14px font-weight-bold"
		>
			{{ data.name }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { darken } from 'polished'
import { MemberRankItemDTO } from '~/composables/apis/use-member-list'

interface Props {
	data: MemberRankItemDTO
	showName?: boolean
	showIcon?: boolean
}

const props = defineProps<Props>()
</script>
