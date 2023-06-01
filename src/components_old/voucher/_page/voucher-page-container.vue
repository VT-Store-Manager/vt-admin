<template>
	<base-table v-show="!voucher.loading">
		<template #head>
			<atom-thead
				title="Name"
				field-name="code"
				:sorting-field-name="sortingFieldName"
				@sort="onDataSort"
			/>
			<atom-thead
				title="Partner"
				field-name="partner"
				:sorting-field-name="sortingFieldName"
				@sort="onDataSort"
			/>
			<atom-thead
				title="Publish"
				field-name="startTime"
				:sorting-field-name="sortingFieldName"
				@sort="onDataSort"
			/>
			<atom-thead
				title="Last update"
				field-name="updatedAt"
				:sorting-field-name="sortingFieldName"
				@sort="onDataSort"
			/>
			<atom-thead
				title="Status"
				field-name="disabled"
				:sorting-field-name="sortingFieldName"
				@sort="onDataSort"
			/>
			<atom-thead
				title="Actions"
				:sortable="false"
				text-align="right"
				:show-sort-icon="false"
			/>
		</template>
		<template #data>
			<tr
				v-for="(row, index) in voucherData || []"
				:key="row.id"
				:class="{ 'bg-screen': index % 2 === 1 }"
			>
				<!-- <td>
					<v-hover>
						<template #default="{ isHovering: hoveringId, props: idProps }">
							<nuxt-link
								:to="`/voucher/${row.id}`"
								v-bind="idProps"
								:class="{ 'text-primary-darken': hoveringId }"
							>
								<b>{{ row.code }}</b>
								<v-tooltip
									activator="parent"
									location="start"
									:open-delay="500"
								>
									{{ row.id }}
								</v-tooltip>
							</nuxt-link>
						</template>
					</v-hover>
				</td> -->
				<td class="d-flex align-center">
					<v-hover v-slot="{ isHovering: hoveringName, props: nameProps }">
						<nuxt-link
							:to="'/product/' + row.id"
							class="d-flex align-center"
							v-bind="nameProps"
						>
							<v-img
								class="mr-4 rounded small-img-shadow"
								:src="serverUrlImage(row.image)"
								width="40"
								aspect-ratio="1/1"
								:class="{ 'hover-blur': hoveringName }"
							/>
							<div>
								<p :class="{ 'text-primary-darken': hoveringName }">
									{{ row.name }}
								</p>
								<h5>{{ row.code }}</h5>
							</div>
						</nuxt-link>
					</v-hover>
				</td>
				<td>
					<v-hover v-if="row.partner">
						<template #default="{ isHovering: hoveringId, props: idProps }">
							<nuxt-link
								:to="`/partner/${row.partner.id}`"
								v-bind="idProps"
								:class="{ 'text-primary-darken': hoveringId }"
							>
								<b>{{ row.partner.code }}</b>
								<v-tooltip
									activator="parent"
									location="start"
									:open-delay="500"
								>
									{{ row.partner.name }}
								</v-tooltip>
							</nuxt-link>
						</template>
					</v-hover>
					<template v-else> _ </template>
				</td>
				<td>
					<b
						:class="[
							row.publishStatus === PublishStatus.NOT_YET
								? 'text-grey'
								: row.publishStatus === PublishStatus.OPENING
								? 'text-green'
								: 'text-red'
						]"
					>
						{{ publishStatus[row.publishStatus] }}
					</b>
					<v-tooltip
						activator="parent"
						location="start"
						:open-delay="500"
					>
						<p>From: {{ new Date(row.startTime).toLocaleString() }}</p>
						<p v-if="row.finishTime">
							To: {{ new Date(row.finishTime).toLocaleString() }}
						</p>
					</v-tooltip>
				</td>
				<td>
					{{ moment(row.updatedAt).fromNow() }}
				</td>
				<td>
					<v-chip
						size="small"
						variant="elevated"
						:color="
							row.status === Status.ACTIVE
								? 'green-lighten-1'
								: row.status === Status.DISABLED
								? 'purple-lighten-3'
								: 'red-lighten-2'
						"
					>
						{{ row.status }}
					</v-chip>
				</td>

				<td>
					<button-action-group
						edit
						delete
					/>
					<!-- @click:edit="onEditItem(row.id)"
						@click:delete="rowCodeConfirmed = row.id" -->
				</td>
				<base-table-confirm-delete />
				<!-- :show="rowCodeConfirmed === row.id"
					@click:cancel="rowCodeConfirmed = null"
					@click:confirm-delete="onDeleteItem(row.id)" -->
			</tr>
		</template>
	</base-table>
</template>

<script lang="ts" setup>
import moment from 'moment'
import { VoucherItemModel } from '~/models/voucher-model'
import { Status, PublishStatus } from '~/constants'

const voucher = useVoucher()
const voucherData = ref<VoucherItemModel[]>([])
const sortingFieldName = ref<keyof VoucherItemModel>()

watch(
	() => voucher.response?.data.items,
	() => {
		if (voucher.response) {
			voucherData.value = voucher.response.data.items
		}
	}
)

const onDataSort = (fieldName: string, ascOrder: boolean) => {
	sortingFieldName.value = fieldName as keyof VoucherItemModel
	voucherData.value.sort(
		dataCompareFunc<VoucherItemModel>(sortingFieldName.value, ascOrder)
	)
}

const now = Date.now()
const publishStatus = ['Not yet', 'Opening', 'Closed']
const checkVoucherPublish = (startTime: number, finishTime?: number) => {
	if (now < startTime) {
		return 0
	}
	if (!finishTime || now < finishTime) {
		return 1
	}
	return 2
}
</script>
