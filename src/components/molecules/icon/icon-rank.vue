<template>
	<div class="rank-icon d-flex align-center">
		<atom-img
			v-if="showIcon"
			:src="data.appearance.icon"
			height="20"
			max-width="20"
			server-img
			placeholder="/img/logo/transparent-grey.png"
			class="mr-1"
		/>
		<p
			v-if="showName"
			:style="{ color: darken(0.1, data.appearance.color) }"
			class="text-16px font-weight-bold"
		>
			{{ data.name }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { darken } from 'polished'
import { RankListItemModel } from '~/models'

interface Props {
	data: RankListItemModel
	showName?: boolean
	showIcon?: boolean
}

const props = defineProps<Props>()
</script>
