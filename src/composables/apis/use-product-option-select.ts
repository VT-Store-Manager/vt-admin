import { ProductOptionSelectModel } from '~/models'

export const useProductOptionSelect = definePiniaStore(
	'product-option-select',
	() => {
		const { data, pending, error, refresh } = useRequest<
			ProductOptionSelectModel[]
		>('/v1/admin/product-option/select-list', {
			transform: input => input.data,
		})

		const selectedValues = ref<string[]>([])
		const setSelectedValues = (values: string[]) => {
			selectedValues.value = values
		}

		const optionMap = computed(() => {
			return new Map(
				(data.value || []).map((obj, index) => [obj.value, { ...obj, index }])
			)
		})

		const disableChildrenOptions = (
			options: ProductOptionSelectModel[],
			parentValue: string,
			...ignoreValues: string[]
		) => {
			options.forEach(obj => {
				if (ignoreValues.includes(obj.value)) {
					return
				}
				if (obj.parent === parentValue) {
					obj.disabled = true
				}
			})
		}

		const selectDataList = computed(() => {
			const updateData = (data.value || []).map(obj => ({ ...obj }))

			selectedValues.value.forEach(value => {
				const optionModelValue = optionMap.value.get(value)
				if (!optionModelValue) return
				const { parent: parentValue } = optionModelValue

				if (parentValue) {
					const parentOptionModelValue = optionMap.value.get(parentValue)
					if (!parentOptionModelValue) return

					updateData[parentOptionModelValue.index].disabled = true
					disableChildrenOptions(
						updateData,
						parentValue,
						optionModelValue.value
					)
				} else {
					disableChildrenOptions(updateData, value)
				}
			})

			return updateData
		})

		return { data, pending, error, refresh, setSelectedValues, selectDataList }
	}
)
