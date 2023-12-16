<template>
	<v-row v-if="storeData">
		<v-col cols="4">
			<organism-edit-images
				:init-images="storeData.images"
				:max-files="maxFiles"
				:pending="status === 'pending'"
				class="h-100"
				@save="onUpdateStoreImage"
			/>
		</v-col>
		<v-col cols="8">
			<template-store-edit-info />
		</v-col>
		<v-col cols="12">
			<template-store-edit-unavailable />
		</v-col>
		<v-col cols="12">
			<template-store-edit-employee />
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
const storeDetail = useStoreDetail()
const { storeData } = storeToRefs(storeDetail)
const { refresh } = storeDetail
const { executePayload, status } = useUpdateStoreImage()
const { push } = useAlert()
const maxFiles = 6
const storeId = useRoute().params.id as string

const onUpdateStoreImage = async (images: Array<string | File>) => {
	const files: File[] = images.filter(image => image instanceof File) as any
	const imageMap = images.reduce((res, image, index) => {
		if (typeof image === 'string') {
			res.push(`[${index}]:${image}`)
		}
		return res
	}, [] as string[])

	await executePayload(storeId, {
		files,
		imageMap,
	})

	if (!storeDetail.error) {
		push({
			type: 'success',
			text: "Update store's images successfully",
			duration: 5000,
		})
	} else {
		push({
			type: 'error',
			text: "Update store's images failed",
			duration: 15000,
		})
	}
	await refresh()
}
</script>
