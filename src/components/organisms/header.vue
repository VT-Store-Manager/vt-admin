<template>
	<header class="header">
		<div class="header-left">
			<v-hover>
				<template #default="{ props, isHovering }">
					<v-btn
						v-bind="props"
						variant="text"
						:prepend-icon="mdiArrowLeft"
						:disabled="!hasBack"
						:color="isHovering ? 'primary' : 'grey'"
						rounded="pill"
						@click="$router.back()"
					>
						Back
					</v-btn>
				</template>
			</v-hover>
			<molecule-breadcrumbs />
		</div>
		<div class="header-center">
			<molecule-header-search />
		</div>
		<div class="header-right">
			<molecule-header-action />
			<molecule-header-account />
		</div>
	</header>
</template>

<script lang="ts" setup>
import { mdiArrowLeft } from '@mdi/js'

const hasBack = ref(false)
const { $router } = useNuxtApp()
const route = $router.currentRoute

const checkBackExist = () => {
	return window?.history.state?.back && route.value.path !== '/'
}

onMounted(() => {
	hasBack.value = checkBackExist()
})
$router.afterEach(() => {
	hasBack.value = checkBackExist()
})
</script>

<style lang="scss" scoped>
.header {
	height: $header-height;
	min-height: $header-height;
	display: flex;
	justify-content: space-between;
	align-items: center;
	> * {
		display: flex;
		align-items: center;
	}
}
</style>
