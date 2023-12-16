<template>
	<atom-btn
		size="small"
		:flat="true"
		variant="tonal"
		class="font-weight-bold"
	>
		<v-icon
			icon="fa:fas fa-arrow-rotate-left"
			color="grey-darken-2"
		/>
		<v-tooltip
			activator="parent"
			location="left center"
		>
			Restore
		</v-tooltip>
	</atom-btn>
</template>
