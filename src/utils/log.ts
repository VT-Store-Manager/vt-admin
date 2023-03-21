export const logFormData = (body: FormData) => {
	for (const pair of body.entries()) {
		// eslint-disable-next-line no-console
		console.log(pair[0] + ', ' + pair[1])
	}
}
