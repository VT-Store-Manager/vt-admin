export const serverUrlImage = (image: string[] | string, index = 0) => {
	const serverImagePrefix = useRuntimeConfig().public.imgResourceUrl
	console.log(serverImagePrefix)

	if (Array.isArray(image)) {
		return serverImagePrefix + image[index]
	}
	return serverImagePrefix + image
}
