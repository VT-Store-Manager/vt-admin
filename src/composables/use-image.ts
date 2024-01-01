import { urlPattern } from '~/constants'

export const serverUrlImage = (
	image: string | null | undefined,
	altImage?: string,
	fromServer = false
) => {
	if (image && urlPattern.test(image)) return image

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
