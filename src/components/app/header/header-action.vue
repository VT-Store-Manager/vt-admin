<template>
	<div class="header-actions">
		<v-btn
			:icon="mdiWeatherNight"
			variant="text"
			size="x-small"
		/>
		<v-btn
			class="notification"
			variant="text"
			size="x-small"
			rounded="pill"
		>
			<v-badge
				dot
				color="red"
			>
				<v-icon :icon="mdiBellOutline" />
			</v-badge>
		</v-btn>
	</div>
</template>

<script lang="ts" setup>
import { mdiBellOutline, mdiWeatherNight } from '@mdi/js'
</script>

<style lang="scss" scoped>
.header-actions {
	display: flex;
	align-items: center;
	> .v-btn {
		margin-right: 0.5rem;
	}
	> .v-btn:last-child {
		margin-right: 1.25rem;
	}
	> .v-btn.notification {
		padding: 0;
		width: 2rem;
		height: 2rem;
	}

	.v-badge {
		:deep(.v-badge__badge) {
			animation: pulse 1000ms infinite;
		}
	}
}
</style>
