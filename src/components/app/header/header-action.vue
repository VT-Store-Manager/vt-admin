<template>
	<div class="header-actions">
		<v-switch
			class="switch-theme"
			inset
			:true-icon="mdiWeatherNight"
			:false-icon="mdiWeatherSunny"
			:theme="currentTheme"
			:ripple="false"
			@click="toggleTheme"
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
import { mdiBellOutline, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
import { useTheme } from 'vuetify'

const theme = useTheme()

const currentTheme = computed(() => theme.global.name.value)

const toggleTheme = () => {
	return (theme.global.name.value = theme.global.current.value.dark
		? 'light'
		: 'dark')
}
</script>

<style lang="scss" scoped>
.header-actions {
	display: flex;
	align-items: center;
	> .v-switch.switch-theme {
		margin-right: 0.5rem;
		:deep(.v-input__details) {
			display: none;
		}
		:deep(.v-selection-control) {
			.v-switch__track {
				transition: all 200ms;
				border: 1px solid rgba(60, 60, 60, 0.29);
				background-color: #ddd;
				padding: 5px;
			}
			.v-selection-control__input {
				&::before {
					background-color: transparent;
				}
				.v-icon {
					font-size: 1.375rem;
					background-color: #fff;
					border-radius: 50%;
					padding: 1px;
				}
			}
			&.v-selection-control--dirty {
				.v-switch__track {
					border: 1px solid #8e8e8e;
					background-color: #2f2f2f;
				}
				.v-selection-control__input {
					.v-icon {
						padding: 2px;
						background-color: #1a1a1a;
					}
				}
			}
		}
	}
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
