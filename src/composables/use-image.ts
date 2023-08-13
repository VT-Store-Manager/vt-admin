export const serverUrlImage = (
	image: string | null | undefined,
	altImage?: string,
	fromServer = false
) => {
	const serverImagePrefix =
		useRuntimeConfig().public.apiBase + config.api.filePrefix

	if (!image) {
		if (!altImage) return ''
		if (fromServer) {
			return serverImagePrefix + altImage
		}
		return altImage
	}
	return serverImagePrefix + image
}
