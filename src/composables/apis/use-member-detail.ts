import pick from 'lodash/pick'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { MemberDetailModel } from '~/models'

export const useMemberDetail = defineStore('member-detail', () => {
	const memberId = ref('')

	const { data, pending, error, status, execute, refresh } =
		useRequest<MemberDetailModel>(() => `/member/${memberId.value}/detail`, {
			immediate: false,
			transform: input => input.data,
		})

	const executeWithMemberId = async (id: string) => {
		memberId.value = id
		await execute()
	}

	const memberInfo = computed(() => {
		if (!data.value) return null
		return pick(
			data.value,
			'id',
			'name',
			'gender',
			'dob',
			'phone',
			'deleted',
			'createdAt',
			'memberRank'
		)
	})

	return {
		data,
		memberInfo,
		pending,
		error,
		status,
		executeWithMemberId,
		refresh,
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useMemberDetail as any, import.meta.hot)
	)
}
