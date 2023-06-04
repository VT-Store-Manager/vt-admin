<template>
	<atom-link
		to="/"
		class="logo"
		:class="{ 'only-icon': sidebar.collapse && !sidebarHovering }"
	>
		<v-icon
			:icon="mdiVuetify"
			size="x-large"
			color="primary"
		/>
		<span
			v-if="!sidebar.collapse || sidebarHovering"
			class="text-primary text-uppercase font-weight-black"
		>
			<strong>Vuetify</strong>
		</span>
	</atom-link>
</template>

<script lang="ts" setup>
import { mdiVuetify } from '@mdi/js'

interface Props {
	sidebarHovering?: boolean
}

defineProps<Props>()

const sidebar = useSidebar()
</script>

<style lang="scss" scoped>
.logo {
	white-space: nowrap;
	display: flex;
	align-items: center;
	transition: margin-left 100ms;
	cursor: pointer;
	animation: float-to-left 500ms;
	&.only-icon {
		text-align: center;
		margin-left: 14px;
	}
	.v-icon {
		font-size: 32px;
		margin-right: 10px;
		:deep(svg) {
			transition: filter 0.2s;
			&:hover {
				filter: drop-shadow(0 0 10px $primary-color);
			}
		}
	}
	span {
		font-size: 1.25rem;
		transition: text-shadow 0.2s;
		&:hover {
			text-shadow: 0 0 20px rgba(var(--v-theme-primary), 0.7);
		}
	}
}
</style>
