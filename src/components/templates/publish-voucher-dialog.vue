<template>
	<molecule-dialog
		v-model="show"
		:sheet-attrs="{
			width: '80%',
			maxWidth: '900px',
		}"
		title="Publish vouchers"
		persistent
	>
		<template #headActions>
			<atom-btn
				size="small"
				class="mr-4 font-weight-bold"
				variant="tonal"
				elevation="1"
				@click="refreshData"
			>
				Refresh
			</atom-btn>
			<atom-btn
				size="small"
				class="mr-4 font-weight-bold"
				color="yellow-darken-4"
				variant="tonal"
				elevation="1"
				@click="handleReset"
			>
				Reset
			</atom-btn>
		</template>

		<v-row>
			<v-col cols="6">
				<atom-label label="Start time" />
				<atom-date-picker
					v-model="startTime"
					inline
					auto-apply
					full-width
					position="center"
					class="justify-center"
				/>
				<div class="d-flex justify-space-between py-4">
					<p class="font-weight-bold">From:</p>
					<p class="font-weight-medium">
						<span>{{ moment(startTime).format('dddd') }}</span> &comma;
						<span>{{ moment(startTime).format('YYYY-MM-DD') }}</span> &comma;
						<span>{{ moment(startTime).format('kk:mm:ss Z') }}</span>
					</p>
				</div>
			</v-col>
			<v-col cols="6">
				<molecule-input
					v-model="ranks.value.value"
					input-type="autocomplete"
					label="Ranks"
					:items="rankList.items"
					chips
					closable-chips
					item-title="name"
					item-value="id"
					multiple
					optional
					no-data-text="No rank"
				>
					<template #chip="{ props, item }">
						<v-chip
							v-bind="props"
							:prepend-avatar="serverImgUrl + item.raw.appearance.icon"
							:text="item.raw.code"
							class="mr-1"
						/>
					</template>

					<template #item="{ props, item }">
						<v-list-item
							v-bind="props"
							:prepend-avatar="serverImgUrl + item.raw.appearance.icon"
							:title="item.raw.name"
							:subtitle="item.raw.code"
						>
							<template #prepend>
								<atom-img
									:src="item.raw.appearance.icon"
									server-img
									width="25"
									class="mr-4"
								/>
							</template>
						</v-list-item>
					</template>
				</molecule-input>
				<molecule-input
					v-model="members.value.value"
					input-type="autocomplete"
					label="Members"
					:items="memberList.items"
					chips
					closable-chips
					item-title="name"
					item-value="id"
					multiple
					optional
					no-data-text="No voucher"
				>
					<template #chip="{ props, item }">
						<v-chip
							v-bind="props"
							:text="item.raw.code"
							class="mr-1"
						/>
					</template>

					<template #item="{ props, item }">
						<v-list-item
							v-bind="props"
							:title="item.raw.name"
							:subtitle="
								item.raw.rank.info.name +
								(ranks.value.value.includes(item.raw.rank.info.id)
									? ' (selected)'
									: '')
							"
							:prepend-avatar="getAvatarDefaultUrl(item.raw.gender)"
							:disabled="ranks.value.value.includes(item.raw.rank.info.id)"
						/>
					</template>
				</molecule-input>
				<molecule-input
					v-model="vouchers.value.value"
					input-type="autocomplete"
					label="Vouchers"
					:items="voucherList.items"
					chips
					closable-chips
					item-title="name"
					item-value="id"
					multiple
					no-data-text="No voucher"
					:error-messages="vouchers.errorMessage.value"
				>
					<template #chip="{ props, item }">
						<v-chip
							v-bind="props"
							:prepend-avatar="serverImgUrl + item.raw.image"
							:text="item.raw.code"
							class="mr-1"
						/>
					</template>

					<template #item="{ props, item }">
						<v-list-item
							v-bind="props"
							:title="item?.raw?.name"
							:subtitle="item?.raw?.code"
						>
							<template #prepend>
								<atom-img
									:src="item.raw.image"
									server-img
									max-width="35"
									aspect-ratio="1/1"
									cover
									placeholder="progress"
									class="rounded shadow-cell-img mr-4"
								/>
							</template>
						</v-list-item>
					</template>
				</molecule-input>
			</v-col>
		</v-row>

		<!-- <molecule-dialog
			v-model="showResultDialog"
			:sheet-attrs="{
				width: '400',
			}"
			:title="
				createMemberVoucher.error
					? 'Publish voucher failed'
					: 'Publish voucher successful'
			"
			hide-close
		>
			<v-card variant="text">
				<v-card-item v-if="!createMemberVoucher.error">
					<p>Total amount: {{ createMemberVoucher.data }} members</p>
					<p>Result:</p>
					<ul>
						<li
							v-for="voucher in createMemberVoucher.data?.result || []"
							:key="voucher.voucher"
						>
							<p>{{ voucher.voucher }}</p>
							<ul>
								<li
									v-for="rank in voucher.failedList"
									:key="rank.rank"
								>
									{{ rank.rank }}
								</li>
							</ul>
						</li>
					</ul>
				</v-card-item>
				<v-card-item v-else>
					Detail: {{ createMemberVoucher.error.message }}
				</v-card-item>
				<v-card-actions>
					<v-btn
						color="primary"
						block
						@click="onCloseResultDialog"
					>
						Close
					</v-btn>
				</v-card-actions>
			</v-card>
		</molecule-dialog> -->
		<template #actions>
			<molecule-btn-save-dialog
				:loading="createMemberVoucher.status === 'pending'"
				@click="submit"
			/>
		</template>
	</molecule-dialog>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useField, useForm } from 'vee-validate'
import { array } from 'yup'

const show = defineModel<boolean>('show', { default: false, local: true })
const { handleReset, handleSubmit } = useForm({
	validationSchema: {
		vouchers: array().required().min(1, 'At least 1 voucher').default([]),
		members: array().required().default([]),
		ranks: array().required().default([]),
	},
	initialValues: {
		vouchers: [] as string[],
		members: [] as string[],
		ranks: [] as string[],
	},
})

const startTime = ref<Date>(new Date())
const vouchers = useField<string[]>('vouchers')
const members = useField<string[]>('members')
const ranks = useField<string[]>('ranks')

const serverImgUrl = useRuntimeConfig().public.imgResourceUrl

const rankList = useRankList()
const memberList = useMemberList()
const voucherList = useVoucherList()
const createMemberVoucher = useCreateMemberVoucher()
const { push } = useAlert()

const refreshData = () => {
	rankList.refresh()
	memberList.refresh()
	voucherList.refresh()
}

refreshData()

const submit = handleSubmit(async values => {
	await createMemberVoucher.executeWithPayload({
		target: [...values.ranks, ...values.members],
		vouchers: values.vouchers,
		startTime: startTime.value.getTime(),
	})
	if (!createMemberVoucher.error) {
		show.value = false
		push({
			type: 'success',
			text: 'Publish voucher successfully',
			duration: 5000,
		})
	}
})
</script>

<style scoped lang="scss"></style>
