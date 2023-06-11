<template>
	<molecule-list-page-container page-name="Members">
		<template #subtitle>
			<p>{{ totalCount }} member{{ totalCount > 1 ? 's' : '' }}</p>
		</template>
		<template #title-right>
			<molecule-btn-refresh
				class="mr-3"
				title="Refresh data"
				@click="refresh"
			/>
			<molecule-btn-create @click="$router.push('/member/create')">
				New
			</molecule-btn-create>
		</template>
		<template-member-list />
	</molecule-list-page-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const memberList = useMemberList()
const { totalCount } = storeToRefs(memberList)
const { refresh, pushQuery } = memberList

pushQuery()
</script>
