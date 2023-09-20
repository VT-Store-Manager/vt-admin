<template>
	<v-table class="rounded-12 px-4 pb-2">
		<thead>
			<tr>
				<th class="text-left font-weight-bold">Feature name</th>
				<th
					class="text-center font-weight-bold text-primary"
					width="13%"
				>
					All
				</th>
				<th
					v-for="permission in permissionData.permissionKeys"
					:key="permission"
					class="text-center font-weight-bold text-14px"
					:class="`text-${permissionColor[permission]}`"
					width="15%"
				>
					{{ capitalize(permission) }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="nameKey in permissionData.nameKeys"
				:key="nameKey"
			>
				<td>
					<p class="font-weight-semibold pt-2 mr-2">
						{{ capitalize(nameKey) }}
					</p>
					<v-chip-group v-if="getSortedPermission(nameKey).length">
						<v-chip
							v-for="key in getSortedPermission(nameKey)"
							:key="key"
							:class="[
								`text-${permissionColor[key]}`,
								'font-weight-semibold',
								'mr-1 mt-0 mb-2',
							]"
							size="small"
						>
							{{ key }}
						</v-chip>
					</v-chip-group>
					<v-chip
						v-else
						class="text-grey mt-1 mb-3"
						size="small"
					>
						None
					</v-chip>
				</td>
				<td>
					<v-checkbox
						hide-details
						color="primary"
						:model-value="isSelectAll(nameKey)"
						:indeterminate="isIndeterminate(nameKey)"
						@click="onSelectAll(nameKey)"
					/>
				</td>
				<td
					v-for="permission in permissionData.permissionKeys"
					:key="permission"
				>
					<v-checkbox
						v-model="permissionSelected[nameKey]"
						:value="permission"
						:color="permissionColor[permission]"
						hide-details
					/>
				</td>
			</tr>
		</tbody>
	</v-table>
</template>

<script setup lang="ts">
import capitalize from 'lodash/capitalize'

interface Props {
	initFn?: Function
}

const props = defineProps<Props>()
const { permissionData } = storeToRefs(useAdminRolePermission())
const permissionSelected = defineModel<Record<string, string[]>>(
	'permissionSelected',
	{
		local: true,
		default: {},
	}
)
const assignSelected = () => {
	if (permissionData && permissionData.value) {
		permissionSelected.value = permissionData.value.nameKeys.reduce<
			Record<string, string[]>
		>((obj, key) => {
			obj[key] = obj[key] || []
			return obj
		}, {})
	}
}
watch(permissionData, () => {
	if (props.initFn) {
		props.initFn()
	} else {
		assignSelected()
	}
})
onMounted(() => {
	if (props.initFn) {
		props.initFn()
	} else {
		assignSelected()
	}
})
const colorList = [
	'red-darken-2',
	'green-darken-3',
	'deep-purple-darken-1',
	'blue-darken-1',
]
const permissionColor = reactive<Record<string, string>>(
	permissionData.value.permissionKeys.reduce<Record<string, string>>(
		(obj, key, index) => {
			obj[key] = colorList[index]
			return obj
		},
		{}
	) || {}
)

const isIndeterminate = (nameKey: string) => {
	const permissionLength = permissionData.value.permissionKeys.length
	const selectedLength = permissionSelected.value[nameKey]?.length

	return !!(
		selectedLength &&
		selectedLength > 0 &&
		selectedLength < permissionLength
	)
}

const isSelectAll = (nameKey: string) => {
	return (
		permissionData.value.permissionKeys.length ===
		permissionSelected.value[nameKey]?.length
	)
}

const onSelectAll = (nameKey: string) => {
	if (isSelectAll(nameKey)) {
		permissionSelected.value[nameKey] = []
	} else {
		permissionSelected.value[nameKey] = permissionData.value.permissionKeys
	}
}

const getSortedPermission = (nameKey: string) => {
	return permissionData.value.permissionKeys.filter(pKey => {
		return permissionSelected.value[nameKey]?.includes(pKey)
	})
}
</script>

<style scoped>
:deep(.v-checkbox-btn) {
	justify-content: center;
}
</style>
