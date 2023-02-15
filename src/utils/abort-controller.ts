export const getAbortController = (timeout = 10000) => {
	const controller = new AbortController()
	const id = setTimeout(() => controller.abort(), timeout)
	return { ...controller, timeoutId: id }
}
