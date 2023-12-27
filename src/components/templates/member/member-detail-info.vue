<template>
	<atom-labeled-sheet
		v-if="memberInfo"
		label="Thông tin"
		:icon="mdiCardAccountDetails"
		class="pt-10 pb-6 h-100 d-flex flex-column"
	>
		<div class="d-flex align-center pt-4 pb-2">
			<atom-img
				class="mr-3 rounded-circle small-img-shadow"
				:src="getAvatarDefaultUrl(memberInfo.gender)"
				:alt-src="[getAvatarDefaultUrl(memberInfo.gender)]"
				max-width="33%"
				:style="{
					aspectRatio: 1,
					...(memberInfo.deleted ? { filter: 'grayscale(1)' } : {}),
					outline: `4px solid ${memberInfo.memberRank.rank.appearance.color}`,
					boxShadow: `0 0 10px ${memberInfo.memberRank.rank.appearance.color}`,
				}"
			/>
			<div class="ml-3">
				<molecule-icon-rank
					:data="memberInfo.memberRank.rank"
					show-name
					show-icon
					:icon-props="{
						maxWidth: '30px',
						height: '30px',
					}"
					:name-props="{
						class: 'text-20px ml-2',
					}"
				/>
				<div class="font-weight-medium d-flex align-center mt-2">
					<v-icon
						:icon="mdiParking"
						color="grey-darken-3"
						size="20px"
						class="ml-1"
					/>
					<p class="font-weight-bold ml-4 text-grey">
						<span class="text-green-darken-3">
							{{ memberInfo.memberRank.currentPoint }}
							<v-tooltip
								activator="parent"
								location="bottom right"
							>
								Chưa sử dụng
							</v-tooltip>
						</span>
						/
						<span class="text-red-darken-4">
							{{ memberInfo.memberRank.usedPoint }}
							<v-tooltip
								activator="parent"
								location="bottom center"
							>
								Đã sử dụng
							</v-tooltip>
						</span>
						/
						<span class="text-indigo-darken-4">
							<v-tooltip
								activator="parent"
								location="bottom left"
							>
								Đã hết hạn
							</v-tooltip>
							{{ memberInfo.memberRank.expiredPoint }}
						</span>
					</p>
				</div>
			</div>
		</div>
		<div class="mt-4">
			<p class="font-weight-medium d-flex align-center text-16px">
				<molecule-icon-gender
					:gender="memberInfo.gender"
					class="mr-4"
					size="20px"
				/>
				<span class="font-weight-bold text-grey-darken-3 ml-1 text-18px">
					{{ memberInfo.name }}
					<span class="text-14px font-weight-semibold text-red-darken-4 ml-1">
						{{ memberInfo.deleted ? '(đã xoá)' : '' }}
					</span>
				</span>
			</p>
			<div class="d-flex align-center mt-2">
				<v-icon
					:icon="mdiBarcode"
					color="grey-darken-3"
					size="20px"
				/>
				<p
					class="font-weight-semibold ml-5 text-grey-darken-3"
					:style="{ letterSpacing: '0.05em' }"
				>
					{{ memberInfo.memberRank.code }}
				</p>
			</div>
			<div class="d-flex align-center mt-2">
				<v-icon
					:icon="mdiPhoneHangup"
					color="grey-darken-3"
					size="20px"
				/>
				<p class="font-weight-semibold ml-5 text-14px text-grey-darken-3">
					{{ getPhoneFormat(memberInfo.phone) }}
				</p>
			</div>
			<div class="d-flex align-center mt-2">
				<v-icon
					:icon="mdiCakeVariant"
					color="grey-darken-3"
					size="20px"
				/>
				<p class="font-weight-semibold ml-5 text-14px text-grey-darken-3">
					{{ $dayjs(memberInfo.dob).format('YYYY - MM - DD') }}
					<span
						class="text-12px d-inline-block"
						:style="{ transform: 'translateY(-1px)' }"
					>
						&nbsp;({{ $dayjs(new Date()).diff(memberInfo.dob, 'year') }}
						tuổi)
					</span>
				</p>
			</div>
		</div>
	</atom-labeled-sheet>
</template>

<script setup lang="ts">
import {
	mdiBarcode,
	mdiPhoneHangup,
	mdiCardAccountDetails,
	mdiParking,
	mdiCakeVariant,
} from '@mdi/js'

const { memberInfo } = storeToRefs(useMemberDetail())
</script>
