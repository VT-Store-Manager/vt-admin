<template>
	<molecule-dialog
		v-model="show"
		:card-attrs="{}"
		:sheet-attrs="{
			width: '95%',
			maxWidth: '900px',
		}"
		title="Tạo vai trò mới"
		persistent
		:error-message="createRole.error?.data?.message"
		:status="createRole.status"
	>
		<v-row>
			<v-col cols="6">
				<molecule-input
					v-model="roleName"
					input-type="text-field"
					label="Role name"
					hide-details
				/>
			</v-col>
			<v-col cols="12">
				<atom-label label="Permission list" />
				<lazy-organism-role-select-table
					v-model:permission-selected="permissions"
				/>
			</v-col>
		</v-row>

		<template #actions>
			<molecule-btn-keep-and-close @click="show = false" />
			<molecule-btn-save-dialog
				:loading="createRole.status === 'pending'"
				:disabled="disableCreateButton"
				@click="onSave"
			/>
		</template>
	</molecule-dialog>
</template>

<script setup lang="ts">
const show = defineModel<boolean>('show', { default: false, local: true })
const createRole = useCreateAccountRole()
const { refresh } = useAccountAdminRoleList()

const roleName = ref('')
const permissions = ref<Record<string, string[]>>({})

const disableCreateButton = computed(() => {
	if (!roleName.value) return true
	return Object.values(permissions.value).every(scopes => !scopes?.length)
})

const onSave = async () => {
	await createRole.executeWithPayload(
		roleName.value,
		Object.keys(permissions.value).map(featureName => ({
			featureName,
			scopes: permissions.value[featureName],
		}))
	)
	if (createRole.data) {
		refresh()
		show.value = false
	}
}
</script>

<style scoped></style>
