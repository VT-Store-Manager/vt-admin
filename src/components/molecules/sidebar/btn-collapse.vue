<template>
	<v-hover v-slot="{ isHovering, props: props }">
		<atom-btn
			v-bind="props"
			class="collapse-button"
			:class="{
				hide: sidebar.collapse && !sidebarHovering,
				collapse: sidebar.collapse,
			}"
			variant="outlined"
			size="x-small"
			rounded="circle"
			icon
			:color="isHovering ? 'primary' : 'grey'"
			@click="onChangeSidebarCollapseInCookie"
		>
			<v-icon
				icon="fa:fas fa-arrow-left"
				size="large"
			/>
		</atom-btn>
	</v-hover>
</template>

<script lang="ts" setup>
interface Props {
	sidebarHovering?: boolean
}

defineProps<Props>()

const sidebar = useSidebar()

const onChangeSidebarCollapseInCookie = () => {
	sidebar.setCollapse(sidebar.collapse ? undefined : 1)
}
</script>

<style lang="scss" scoped>
.collapse-button {
	height: 1.5rem;
	width: 1.5rem;
	border-width: 2px;
	&.hide {
		visibility: hidden;
	}
	:deep(.v-icon) {
		transition: transform 500ms;
		font-size: 0.8125rem;
		animation: shake-left 2000ms infinite;
	}
	&:hover {
		transform: scale(1.2);
		opacity: 0.7;
		animation: pulse-primary 1000ms infinite;
		:deep(.v-icon) {
			animation: none;
		}
	}
	&.collapse {
		:deep(.v-icon) {
			transform: rotateZ(180deg);
			animation: shake-right 2000ms infinite;
		}
		&:hover {
			animation: pulse-primary 800ms infinite;
			:deep(.v-icon) {
				animation: none;
			}
		}
	}
}
</style>
