<template>
	<v-row v-if="memberData">
		<v-col
			md="5"
			lg="4"
		>
			<template-member-detail-info />
		</v-col>
		<v-col
			md="7"
			lg="8"
		>
			<template-member-detail-statistic />
		</v-col>
		<v-col cols="12">
			<template-member-detail-order />
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
const { data: memberData } = storeToRefs(useMemberDetail())
</script>
