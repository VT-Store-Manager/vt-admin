<template>
	<div class="account d-flex">
		<atom-avatar class="rounded-circle small-img-shadow">
			<atom-img
				:src="avatar"
				:alt-src="[avatar, defaultAvatar]"
				placeholder="progress"
				server-img
				:place-holder-props="{
					size: 24,
					width: 3,
				}"
			/>
		</atom-avatar>
		<div class="account-info">
			<p class="account-info__name">
				<b>{{ currentAdmin.name }}</b>
			</p>
			<p class="account-info__role">{{ currentAdmin.role.join(', ') }}</p>
		</div>
		<v-menu
			location="bottom right"
			activator="parent"
			transition="slide-y-transition"
			open-on-click
		>
			<v-sheet
				class="font-weight-semibold rounded-b-lg rounded-t-sm pa-2 mt-2 elevation-1"
			>
				<div class="px-1 mb-2 d-flex justify-center align-center text-grey">
					<p class="text-14px">ID:&nbsp;</p>
					<p class="text-14px">{{ currentAdmin.username }}</p>
				</div>

				<v-btn
					variant="text"
					block
					:prepend-icon="mdiAccount"
					class="mt-1"
				>
					Tài khoản
				</v-btn>
				<v-divider class="my-1" />
				<v-btn
					variant="text"
					block
					:prepend-icon="mdiLogoutVariant"
					color="red-darken-4"
					@click="authStore.logout"
				>
					Đăng xuất
				</v-btn>
			</v-sheet>
		</v-menu>
	</div>
</template>

<script lang="ts" setup>
import { faker } from '@faker-js/faker'
import { mdiLogoutVariant, mdiAccount } from '@mdi/js'

const defaultAvatar = faker.image.avatar()
const authStore = useAuthStore()
const { currentAdmin } = storeToRefs(authStore)
const { accountMap } = storeToRefs(useAccountAdminList())

const avatar = computed(() => {
	return (
		accountMap.value.get(currentAdmin.value.id)?.avatar ||
		currentAdmin.value.avatar ||
		''
	)
})
</script>

<style lang="scss" scoped>
.account {
	padding-right: 1rem;
	align-items: center;
	cursor: pointer;
	transition: all 0.3s;

	* {
		transition: all 0.3s;
	}
	&:hover {
		opacity: 0.7;
	}
	.v-img {
		opacity: 1 !important;
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
