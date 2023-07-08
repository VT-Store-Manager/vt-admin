type BodyType = {
	target: string[]
	vouchers: string[]
	startTime: number
}

export type CreateVoucherResultItemModel = {
	voucher: string
	failedList: {
		rank: string
		members: string[]
	}[]
}

export type CreateMemberVoucherResultModel = {
	totalCount: number
	result: CreateVoucherResultItemModel[]
}

export const useCreateMemberVoucher = definePiniaStore(
	'create-member-voucher',
	() => {
		const body = ref<BodyType>()
		const { data, pending, error, execute, status } =
			useRequest<CreateMemberVoucherResultModel>(
				'/v1/admin/member-voucher/create',
				{
					method: 'POST',
					body,
					transform: input => input.data,
					immediate: false,
				}
			)

		const executeWithPayload = async (data: BodyType) => {
			body.value = data
			await execute({ dedupe: true })
		}

		return { data, pending, error, status, executeWithPayload }
	}
)
