<template>
	<div class="header-action">
		<atom-switch
			class="switch-theme"
			:model-value="isDark"
			inset
			:true-icon="mdiWeatherNight"
			:false-icon="mdiWeatherSunny"
			:ripple="false"
			@click="toggleTheme"
		/>
		<atom-btn
			class="notification"
			variant="text"
			size="x-small"
			rounded="pill"
		>
			<atom-badge
				dot
				color="red"
			>
				<v-icon :icon="mdiBellOutline" />
			</atom-badge>
		</atom-btn>
	</div>
</template>

<script lang="ts" setup>
import { mdiBellOutline, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'

import { GLOBAL_THEME_KEY, AppTheme } from '~/constants'

const theme = useThemeUtil()
const { isDark } = storeToRefs(theme)
const { setTheme } = theme
const themeCookieValue = useCookie(GLOBAL_THEME_KEY, {
	default: () => AppTheme.LIGHT,
	maxAge: 60 * 60 * 24 * 365,
})

const toggleTheme = () => {
	const newTheme = isDark.value ? AppTheme.LIGHT : AppTheme.DARK
	setTheme(newTheme)
	themeCookieValue.value = newTheme
}
</script>

<style lang="scss" scoped>
.header-action {
	display: flex;
	align-items: center;
	> .switch-theme {
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
	> .notification {
		padding: 0;
		width: 2rem;
		height: 2rem;
	}

	.badge {
		:deep(.v-badge__badge) {
			animation: pulse 1000ms infinite;
		}
	}
}
</style>
