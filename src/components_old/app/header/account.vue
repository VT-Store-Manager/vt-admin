<template>
	<div class="account d-flex">
		<v-avatar image="/avatar-sample.webp" />
		<div class="account-info">
			<p class="account-info__name"><b>Vinh NQ</b></p>
			<p class="account-info__role">Software engineer</p>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.account {
	padding-right: 1rem;
	align-items: center;
	cursor: pointer;
	.v-avatar {
		:deep(.v-img) {
			width: 2.5rem;
			height: 2.5rem;
		}
	}

	&-info {
		margin-left: 0.75rem;

		&__name {
			font-size: 0.875rem;
			font-weight: 500;
			line-height: 1.25rem;
		}
		&__role {
			font-size: 0.75rem;
			line-height: 1rem;
		}
	}
}
</style>
