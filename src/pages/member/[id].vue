<template>
	<molecule-list-page-container
		page-name="Chi tiết thành viên"
		:page-title="
			memberDetail.data?.name
				? `Thành viên ${memberDetail.data.name}`
				: 'Chi tiết thành viên'
		"
		scroll
	>
		<template #title-right>
			<molecule-btn-refresh
				title="Làm mới"
				@click="memberDetail.refresh"
			/>
		</template>
		<template-member-detail />
	</molecule-list-page-container>
</template>

<script setup lang="ts">
const memberDetail = useMemberDetail()

const memberId = useRoute().params.id as string
if (memberId) {
	await memberDetail.executeWithMemberId(memberId)
}
</script>
