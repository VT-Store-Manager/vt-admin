export const dataCompareFunc = <T>(
	fieldName: keyof T,
	ascOrder: boolean
): ((a: T, b: T) => 0 | 1 | -1) => {
	return (a: T, b: T) => {
		const val1 = a[fieldName]
		const val2 = b[fieldName]
		if (!val1 && !val2) return 0
		if (!val1) return ascOrder ? -1 : 1
		if (!val2) return ascOrder ? 1 : -1
		if (val1 < val2) return ascOrder ? -1 : 1
		if (val1 > val2) return ascOrder ? 1 : -1
		return 0
	}
}
