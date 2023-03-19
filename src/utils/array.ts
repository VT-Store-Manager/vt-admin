/**
 * It returns a function that compares two objects based on a field name and an ascending/descending
 * order.
 * @param fieldName - keyof T
 * @param {boolean} ascOrder - boolean - true for ascending order, false for descending order
 * @returns A function that takes two arguments and returns a number.
 */
export const dataCompareFunc = <T>(
	fieldName: keyof T,
	ascOrder: boolean,
	subFieldName?: string
): ((a: T, b: T) => 0 | 1 | -1) => {
	return (a: T, b: T) => {
		const val1 = subFieldName
			? (a[fieldName] as any)[subFieldName]
			: a[fieldName]
		const val2 = subFieldName
			? (b[fieldName] as any)[subFieldName]
			: b[fieldName]
		if (!val1 && !val2) return 0
		if (!val1) return ascOrder ? -1 : 1
		if (!val2) return ascOrder ? 1 : -1
		if (val1 < val2) return ascOrder ? -1 : 1
		if (val1 > val2) return ascOrder ? 1 : -1
		return 0
	}
}
