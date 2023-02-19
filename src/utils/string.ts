export const variableCaseToText = (key: string) => {
	const result = key.replace(/([A-Z])/g, ' $1')
	const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
	return finalResult
}

export const temporaryUniqueKey = () => {
	const r =
		Math.random().toString(36).substr(2, 3) +
		'-' +
		Math.random().toString(36).substr(2, 3) +
		'-' +
		Math.random().toString(36).substr(2, 4)
	return r
}
